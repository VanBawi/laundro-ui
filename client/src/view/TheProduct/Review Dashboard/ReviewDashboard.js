import React, { useState, useEffect } from 'react';
import { Button, Rate, message, Select, Radio, Progress, Empty } from 'antd';
import './review.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	UserOutlined,
	StarTwoTone,
	StarOutlined,
	HeartOutlined,
	SmileOutlined,
	MessageTwoTone,
} from '@ant-design/icons';
import { RingProgress } from '@ant-design/plots';
import LineChart from './LineChart';
import { getReviews, resolveReview } from '../../../reducer/reviewDashReducer';
import moment from 'moment';
import { allOutlets } from '../../../reducer/outletReducer';
import { fetchOperators } from '../../../reducer/userReducer';
import { selectYear, monthsFullName } from '../../../utilities/helperData';
import Spinner from '../../../components/Spinner';

const ReviewDashboard = () => {
	const dispatch = useDispatch();

	const { reviews, review, loading, error } = useSelector((state) => state.reviewR);
	const { outlets } = useSelector((state) => state.outlets);
	const [filterReviews, setFilterReviews] = useState([]);
	const [distributionData, setDistribution] = useState({
		allFiveStar: 0,
		allFourStar: 0,
		allOneStar: 0,
		allThreeStar: 0,
		allTwoStar: 0,
	});
	const [allOutletsData, setAllOutlets] = useState([]);
	const [outletId, setOutletId] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	const [value, setValue] = useState('pending');

	const { distributor, operator, operators } = useSelector((state) => state.user);

	// console.log('allOutletsData', allOutletsData);
	useEffect(() => {
		if (operator) {
			dispatch(getReviews());
			dispatch(allOutlets());
		}
	}, [dispatch, operator]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	const onChangeRadio = (e) => {
		// console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};

	useEffect(() => {
		if (outlets) {
			const data = outlets.map((each) => {
				return {
					value: each.id,
					label: each.fullname,
				};
			});

			setAllOutlets(data);
		}
	}, [outlets]);

	useEffect(() => {
		if (distributor) {
			dispatch(fetchOperators());
		}
	}, [dispatch, distributor]);

	useEffect(() => {
		if (distributor && operatorId) {
			const query = `operatorId=${operatorId}`;
			dispatch(getReviews(query));
			dispatch(allOutlets(operatorId));
		}
	}, [dispatch, distributor, operatorId]);

	useEffect(() => {
		if (operators) {
			let operatorArr = [];
			for (let i = 0; i < operators.length; i++) {
				operatorArr.push({ value: operators[i].id, label: operators[i].username });
			}

			setOperatorsOptions(operatorArr);

			if (operatorArr.length) {
				setOperatorId(operatorArr[0].value);
			}
		}
	}, [operators]);

	useEffect(() => {
		if (review) {
			message.success('Review successfully updated.');
		}
	}, [review]);

	useEffect(() => {
		if (reviews) {
			if (reviews.data) {
				const reviewFiltered = reviews.data.filter((review) => review.status === 'pending');
				setFilterReviews(reviewFiltered);
			}
			if (reviews.distribution) {
				setDistribution(reviews.distribution);
			}
		}
	}, [reviews]);

	const config = {
		height: 150,
		width: 150,
		autoFit: false,
		percent: reviews && reviews.avgOverall / 100,
		color: ['#0092E0', '#E8EDF3'],
	};

	// console.log('reviews', reviews)

	const onChangeReview = (type) => {
		if (type === 'resolve') {
			const reviewFiltered = reviews.data.filter((review) => review.status === 'resolve');
			setFilterReviews(reviewFiltered);
		}
		if (type === 'pending') {
			const reviewFiltered = reviews.data.filter((review) => review.status === 'pending');
			setFilterReviews(reviewFiltered);
		}

		if (type === 'inProgress') {
			const reviewFiltered = reviews.data.filter((review) => review.status === 'inProgress');
			setFilterReviews(reviewFiltered);
		}
	};

	const submitResolve = (id, status) => {
		// no need
		dispatch(resolveReview({ id: id, status }));

		setTimeout(() => {
			if (operatorId) {
				const query = `operatorId=${operatorId}`;
				dispatch(getReviews(query));
			} else {
				dispatch(getReviews());
			}
		}, 1000);
	};

	const filterReviewFunc = () => {
		if ((!outletId && !year) || (!outletId && !month)) return;
		const query = `outletId=${outletId}&year=${year}&month=${month}&operatorId=${operatorId}`;
		// console.log('query', query)
		setValue('pending');
		dispatch(getReviews(query));
	};

	const clearAllFilters = () => {
		setOutletId('');
		setYear('');
		setMonth('');
		if (operatorId) {
			const query = `operatorId=${operatorId}`;
			dispatch(getReviews(query));
		} else {
			dispatch(getReviews());
		}
	};

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};
	// console.log('outletId', outletId);

	return (
		<div style={{ color: '#666' }}>
			{loading ? <Spinner /> : null}
			<div className='review-list-container border-bottom'>
				<div>
					<div>
						<div className='d-flex justify-content-around'>
							<h5 className='text-center'>
								<div>
									<StarTwoTone style={{ fontSize: '30px', color: '#0092E0' }} />
								</div>
								<div>Total Reviews</div>
								<div style={{ fontWeight: 'bolder' }}>{reviews && reviews.totalReviews}</div>
							</h5>
							<h5 className='text-center'>
								<div>
									<MessageTwoTone style={{ fontSize: '30px', color: '#0092E0' }} />
								</div>
								<div>Total Reviewer</div>
								<div style={{ fontWeight: 'bolder' }}> {reviews && reviews.reviewer}</div>
							</h5>
						</div>

						<div>
							<div className='d-flex justify-content-between'>
								<div className='align-items-center d-flex'>
									<StarOutlined /> <span className='mx-1'>Outlet Cleanliness</span>
								</div>
								<div>{reviews && reviews.avgData && reviews.avgData.avgClean}</div>
							</div>
							<div className='d-flex justify-content-between py-1'>
								<div className='align-items-center d-flex'>
									<SmileOutlined /> <span className='mx-1'>Washer Quality</span>
								</div>
								<div>{reviews && reviews.avgData && reviews.avgData.avgWasher}</div>
							</div>
							<div className='d-flex justify-content-between pb-1'>
								<div className='align-items-center d-flex'>
									<HeartOutlined /> <span className='mx-1'>Dryer Quality</span>
								</div>
								<div>{reviews && reviews.avgData && reviews.avgData.avgDryer}</div>
							</div>
							<div className='d-flex justify-content-between'>
								<div className='align-items-center d-flex'>
									<UserOutlined />
									<span className='mx-1'>Service Quality</span>
								</div>
								<div>{reviews && reviews.avgData && reviews.avgData.avgService}</div>
							</div>
						</div>
					</div>
				</div>
				<div className=' align-self-center pt-3'>
					<h5 className='text-center'>
						<div>Overall Score</div>
					</h5>
					<div className='d-flex justify-content-center'>
						<RingProgress {...config} />
					</div>
				</div>
				<div className='me-4'>
					<div>
						<Rate className='primary-blue' disabled defaultValue={5} /> (
						{distributionData && distributionData.allFiveStar})
						<Progress
							showInfo={false}
							percent={distributionData && distributionData.allFiveStar}
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
						/>
					</div>
					<div>
						<Rate className='primary-blue' disabled defaultValue={4} />(
						{distributionData && distributionData.allFourStar})
						<Progress
							showInfo={false}
							percent={distributionData && distributionData.allFourStar}
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
						/>
					</div>

					<div>
						<Rate className='primary-blue' disabled defaultValue={3} /> (
						{distributionData && distributionData.allThreeStar})
						<Progress
							showInfo={false}
							percent={distributionData && distributionData.allThreeStar}
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
						/>
					</div>
					<div>
						<Rate className='primary-blue' disabled defaultValue={2} /> (
						{distributionData && distributionData.allTwoStar})
						<Progress
							showInfo={false}
							percent={distributionData && distributionData.allTwoStar}
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
						/>
					</div>
					<div>
						<Rate className='primary-blue' disabled defaultValue={1} /> (
						{distributionData && distributionData.allOneStar})
						<Progress
							showInfo={false}
							percent={distributionData && distributionData.allOneStar}
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
						/>
					</div>
				</div>
			</div>
			<div className='pb-4'>
				<div>
					<div className='mt-3 d-flex flex-wrap justify-content-md-center mb-3'>
						<div className='mt-2'>
							{distributor ? (
								<Select
									style={{ width: '12rem', marginRight: '1rem' }}
									value={
										operatorId
											? operatorsOptions && operatorsOptions.find((e) => e.value === operatorId).label
											: 'No Operator'
									}
									onChange={handleChangeOperatorId}
									options={operatorsOptions}
								/>
							) : null}

							<Select
								value={outletId ? allOutletsData.find((e) => e.value === outletId)?.label : 'Select Outlet'}
								style={{ width: '150px', marginRight: '0.5rem' }}
								onChange={(data) => setOutletId(data)}
								options={allOutletsData}
							/>
						</div>
						<div className='mx-md-2 mt-2'>
							<Select
								value={year ? year : 'Select Year'}
								style={{ width: '150px' }}
								onChange={(data) => setYear(data)}
								options={selectYear}
							/>
						</div>
						<div className='mt-2'>
							<Select
								value={month ? month : 'Select Month'}
								style={{ width: '150px' }}
								onChange={(data) => setMonth(data)}
								options={monthsFullName}
							/>
						</div>

						{distributor && !operatorId ? null : (
							<div className='mt-2 ms-2'>
								<Button type='primary' onClick={() => filterReviewFunc()}>
									Filter
								</Button>
								<Button
									className='ms-2'
									type='primary'
									onClick={() => {
										clearAllFilters();
									}}
								>
									Clear All
								</Button>
							</div>
						)}
					</div>
				</div>

				{distributor && !operatorId ? (
					<div className='border py-3'>
						<Empty />
					</div>
				) : (
					<>
						<div>
							<h3>Monthly Scores</h3>
							<LineChart reviews={reviews && reviews.monthlyData} />
						</div>

						<div className='mt-5'>
							<h4>All Reviews ({reviews && reviews.totalReviews}) </h4>
							<div className='d-flex justify-content-end'>
								<div className='d-flex'>
									<Radio.Group onChange={onChangeRadio} value={value}>
										<Radio value={'inProgress'} onClick={() => onChangeReview('inProgress')}>
											In Progress
										</Radio>
										<Radio value={'pending'} checked={value === 'pending'} onClick={() => onChangeReview('pending')}>
											Pending
										</Radio>
										<Radio value={'resolve'} onClick={() => onChangeReview('resolve')}>
											Resolved
										</Radio>
									</Radio.Group>
								</div>
							</div>
							<div>
								{filterReviews.length
									? filterReviews.map((review, idx) => {
											// console.log('review', review);
											return (
												<div
													key={idx}
													className='border mt-2'
													style={{ background: review.status === 'inProgress' ? 'hsl(98, 29%, 85%)' : '#eee' }}
												>
													<div className='p-3 d-md-flex justify-content-md-between'>
														<div className='align-self-center'>
															<div>{review.name}</div>
															<div>{review.number}</div>
														</div>
														<div className='align-self-start' style={{ width: '40%' }}>
															{review.comment}
														</div>

														<div>{moment(review.createdAt).format('YYYY/MM/DD')}</div>
														<div className='text-end'>
															{review.status === 'resolve' ? null : (
																<div className='d-flex'>
																	<Button
																		style={{ width: '5.5rem' }}
																		onClick={() => submitResolve(review.id, 'resolve')}
																		size='small'
																		type='primary'
																	>
																		Resolve
																	</Button>
																	<div className='px-1'></div>
																	{review.status === 'inProgress' ? null : (
																		<Button
																			style={{ width: '5.5rem' }}
																			onClick={() => submitResolve(review.id, 'inProgress')}
																			size='small'
																			type='primary'
																		>
																			In Progress
																		</Button>
																	)}
																</div>
															)}
														</div>
													</div>
												</div>
											);
									  })
									: 'No results found'}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ReviewDashboard;
