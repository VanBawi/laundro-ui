import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, message, Select, Empty } from 'antd';
import '../price.css';
import { MinusSquareTwoTone, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from "react-router-dom";
import AddPricingModal from './AddPricingModal';
import EditPricingModal from './EditPricingModal';
import AssignPriceModal from './AssignPriceModal';
import { deletePricing, getPriceList } from '../../../../reducer/priceSettingReducer';
import moment from 'moment';
import { allOutlets } from '../../../../reducer/outletReducer';
import { fetchOperators } from '../../../../reducer/userReducer';

const PriceList = (props) => {
	const dispatch = useDispatch();

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	const { outlets } = useSelector((state) => state.outlets);
	const { priceLists, removed, error, price } = useSelector((state) => state.pricing);

	const { distributor, operator, operators } = useSelector((state) => state.user);

	const [pricingData, setPricingData] = useState('');

	useEffect(() => {
		if (operator) {
			dispatch(getPriceList());
			dispatch(allOutlets());
		}
	}, [dispatch, operator]);

	useEffect(() => {
		if (distributor && operatorId) {
			dispatch(getPriceList(operatorId));
			dispatch(allOutlets(operatorId));
		}
	}, [dispatch, distributor, operatorId]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (distributor) {
			dispatch(fetchOperators());
		}
	}, [dispatch, distributor]);

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
		if (removed) {
			message.success('Successfully removed.');
			if (operatorId) {
				dispatch(getPriceList(operatorId));
			} else {
				dispatch(getPriceList());
			}
		}
	}, [removed]);
	// set pricing Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// edit pricing Modal
	const [editModalOpen, setEditModalOpen] = useState(false);
	const showEditModal = () => {
		setEditModalOpen(true);
	};
	const handleEditOk = () => {
		setEditModalOpen(false);
	};
	const handleEditCancel = () => {
		setEditModalOpen(false);
	};

	// Assign Price Modal
	const [assignModalOpen, setAssignModalOpen] = useState(false);
	const showAssignModal = () => {
		setAssignModalOpen(true);
	};
	const handleAssignOk = () => {
		setAssignModalOpen(false);
	};
	const handleAssignCancel = () => {
		setAssignModalOpen(false);
	};

	const confirm = (id) => {
		//remove the pricing
		// console.log('id', id)
		dispatch(deletePricing(id));
	};

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};
	// console.log('priceLists', priceLists);
	// console.log('outlets', outlets);

	return (
		<div>
			{!outlets || !outlets.length ? (
				<div>
					{distributor ? (
						<Select
							style={{ width: '12rem', marginRight: '1rem' }}
							value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
							onChange={handleChangeOperatorId}
							options={operatorsOptions}
						/>
					) : null}
					<h5 className='mt-5'>
						<Empty />
					</h5>
				</div>
			) : (
				<div>
					<AddPricingModal
						operatorId={operatorId}
						isModalOpen={isModalOpen}
						handleOk={handleOk}
						handleCancel={handleCancel}
						price={price}
					/>

					<EditPricingModal
						operatorId={operatorId}
						pricingData={pricingData}
						isModalOpen={editModalOpen}
						handleOk={handleEditOk}
						handleCancel={handleEditCancel}
					/>

					<AssignPriceModal
						operatorId={operatorId}
						outlets={outlets}
						pricingData={pricingData}
						priceLists={priceLists}
						isModalOpen={assignModalOpen}
						handleOk={handleAssignOk}
						handleCancel={handleAssignCancel}
						price={price}
					/>

					{distributor ? (
						<Select
							style={{ width: '12rem', marginRight: '1rem' }}
							value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
							onChange={handleChangeOperatorId}
							options={operatorsOptions}
						/>
					) : null}

					<div className='price-list-container'>
						<div
							className='price-list-box d-flex justify-content-center align-items-center'
							style={{ background: '#eee' }}
							onClick={() => showModal()}
						>
							<div className='text-center' style={{ maxWidth: '300px' }}>
								<PlusOutlined style={{ fontSize: '30px', fontWeight: 'bold', color: '#999' }} />
								<div className='h6 mt-2' style={{ marginBottom: '-2rem' }}>
									Add Pricing
								</div>
							</div>
						</div>

						{priceLists && priceLists.length
							? priceLists
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((price, idx) => {
										return (
											<div key={idx} className='price-list-box'>
												<div className='d-flex justify-content-between'>
													<h5 style={{ textTransform: 'capitalize' }}>{price.name}</h5>
													<div>
														<Popconfirm
															placement='topRight'
															title={'Are you sure to delete this pricing?'}
															onConfirm={() => confirm(price.id)}
															okText='Yes'
															cancelText='No'
														>
															<MinusSquareTwoTone twoToneColor='#eb2f96' />
														</Popconfirm>
													</div>
												</div>
												<div className=''>
													<div>
														<small>Desc: {price.description}</small>
													</div>
													<small>Assigned To: {price.outlets.length} outlets </small>
													<div>
														<small>Created On: {moment(price.createdAt).format('DD/MM/YYYY')}</small>
													</div>
												</div>

												<div className='d-flex justify-content-between align-items-center mt-2'>
													<div>
														<Button
															size={'small'}
															type='primary'
															onClick={() => {
																setPricingData(price);
																showEditModal();
															}}
														>
															Details
														</Button>
														<Button
															size={'small'}
															type='primary'
															className='mx-3'
															onClick={() => {
																setPricingData(price);
																showAssignModal();
															}}
														>
															Assign To
														</Button>
													</div>
												</div>
											</div>
										);
									})
							: null}
					</div>

					<div className='mt-5 unassigned-list-container mb-3'>
						<h5 className='fw-bold'>Unassigned Outlets </h5>

						<div style={{ columnCount: 3 }}>
							{outlets && outlets.length
								? outlets
										.filter((each) => !each.pricestrategyId)
										.map((outlet, idx) => {
											return (
												<div key={idx}>
													<span>{idx + 1}.</span> <span className='text-uppercase'>{outlet.fullname} </span>
												</div>
											);
										})
								: null}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PriceList;
