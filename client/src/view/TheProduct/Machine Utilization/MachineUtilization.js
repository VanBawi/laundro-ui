import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '../Sales Performance/salesperformance.css';
import { Progress, Cascader, Select, message, Skeleton, Button, Empty } from 'antd';
import TotalMachineRuntime from './machineBar';
// import TotalMachineRuntimeMonth from './machineBarMonth';
import DemoPie from './statsDonutChart';
import DemoPieMonth from './statsDonutChartMonth';
import DemoDonutTime from './donutChartTime';
import DemoDonutTimeMonth from './donutChartTimeMonth';
import DualAxeMonthly from './dualLineMonthly';
// import DualAxeDaily from './dualLineDaily';
import DualAxeDailyOutlet from './dualLineDailyOutlet';
import { useDispatch, useSelector } from 'react-redux';
import { allOutlets } from '../../../reducer/outletReducer';
import { annualUtilReport, monthlyUtilReport } from '../../../reducer/machineUtilReducer';
import { selectYear, selectMonth, monthNamesShort } from '../../../utilities/helperData';
import { fetchOperators, machineUtilizationFilter } from '../../../reducer/userReducer';

const MachineUtilization = (props) => {
	const dispatch = useDispatch();
	const { outlets } = useSelector((state) => state.outlets);
	const { machineUtilFilter } = useSelector((state) => state.filterReducer);

	const { annualUtil, monthlyUtilData, outletUtilDaily, error } = useSelector((state) => state.util);
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	const [monthStr, setMonthStr] = useState(monthNamesShort[new Date().getMonth()]);
	const [machineData, setMachineData] = useState({
		annualRuntime: [],
		monthlyUtil: '',
		runtimeMonth: [],
		utilDaily: '',
		outletUtilDaily: '',
	});

	const [annualHours, setAnnualHours] = useState(0);
	const [annualTop, setAnnualTop] = useState({});

	const [options, setOptions] = useState([]);
	const [monthlyHrs, setMonthlyHrs] = useState({});

	const [outletName, setOutletName] = useState('');
	const [runtimeAnnualloading, setRuntimeAnnualLoading] = useState(true);
	const [monthUtilLoading, setMonthUtilLoading] = useState(true);
	const [outletDailyloading, setOutletDailyLoading] = useState(true);

	const [outletId, setOutletId] = useState('');
	const [outletIds, setOutletIds] = useState([]);
	const [searchNow, setSearchNow] = useState(false);

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	const { distributor, operator, staff, operators } = useSelector((state) => state.user);

	// console.log(machineData);

	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
			}
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
		if (operator || staff) {
			dispatch(allOutlets());
		}
	}, [dispatch, operator, staff]);

	useEffect(() => {
		if (distributor && operatorId) {
			dispatch(allOutlets(operatorId));
		}
	}, [dispatch, operatorId, distributor]);

	const calculateOutlets = useMemo(() => {
		let outletArr = [];

		if (!outlets || !outlets.length) {
			setOutletName('');
			setOutletId('');
		}

		if (!outlets.length) {
			setOutletDailyLoading(false);
		}

		if (outlets && outlets[0]) {
			setOutletId(outlets[0].id);
			setOutletName(outlets[0].fullname);
		}
		if (outlets) {
			for (let i = 0; i < outlets.length; i++) {
				outletArr.push({ value: outlets[i].id, label: outlets[i].fullname });
			}
			setOptions(outletArr);
		}
	}, [outlets]);
	// console.log('outletName', outletName);
	useEffect(() => {
		// console.log('year', year);
		if (machineUtilFilter) {
			setRuntimeAnnualLoading(true);
			dispatch(annualUtilReport({ year, outlets: outletIds, operatorId }));
		}
	}, [dispatch, machineUtilFilter]);

	useEffect(() => {
		// console.log('year', year)

		if (searchNow) {
			// console.log('hit top search');
			setRuntimeAnnualLoading(true);
			dispatch(annualUtilReport({ year, outlets: outletIds, operatorId }));
			setSearchNow(false);
		}
	}, [searchNow, dispatch]);

	// Total Runtime of Machines By Outlet (year)
	useEffect(() => {
		if (annualUtil) {
			// console.log('annualUtil');
			setRuntimeAnnualLoading(false);
			dispatch(monthlyUtilReport({ year, outlets: outletIds, operatorId }));

			let total = annualUtil.reduce((a, b) => a + b.total, 0);
			setAnnualHours(total);
			setAnnualTop(annualUtil[0]);
		}
	}, [annualUtil]);
	// console.log('annualUtil', annualUtil);
	// Monthly Machine Utilizations
	const calculateOutletMonthly = useCallback(
		(monthlyUtilData) => {
			const washer = monthlyUtilData.reduce((a, b) => a + b.washer, 0);
			const dryer = monthlyUtilData.reduce((a, b) => a + b.dryer, 0);
			const total = monthlyUtilData.reduce((a, b) => a + b.total, 0);
			const washerPercent = (washer / total) * 100;
			const dryerPercent = (dryer / total) * 100;

			const totalData = monthlyUtilData.reduce((a, b) => a + b.total, 0);
			setMonthlyHrs({
				...monthlyHrs,
				washerPercent: washerPercent,
				dryerPercent: dryerPercent,
				washer: washer,
				dryer: dryer,
				runtimeMonth: [totalData, monthlyUtilData[0]],
			});
		},
		[monthlyUtilData]
	);

	useEffect(() => {
		if (monthlyUtilData) {
			setMonthUtilLoading(false);

			calculateOutletMonthly(monthlyUtilData);
		}
	}, [monthlyUtilData]);

	// useEffect(() => {
	// 	if (!outletId) {
	// 		setOutletDailyLoading(false);
	// 	}
	// 	if (outletId && machineUtilFilter) {
	// 		dispatch(outletDailyUtil(year, month, outletId, operatorId));
	// 	}
	// }, [outletId, dispatch, machineUtilFilter]);

	const calculateOutletDaily = useCallback(
		(outletUtilDaily) => {
			const washer = outletUtilDaily.reduce((a, b) => a + b.washer, 0);
			const dryer = outletUtilDaily.reduce((a, b) => a + b.dryer, 0);
			const total = outletUtilDaily.reduce((a, b) => a + b.total, 0);
			const washerPercent = (washer / total) * 100;
			const dryerPercent = (dryer / total) * 100;
			setMachineData({
				...machineData,
				outletUtilDaily: {
					washerPercent: washerPercent,
					dryerPercent: dryerPercent,
					washer: washer,
					dryer: dryer,
				},
			});
		},
		[outletUtilDaily]
	);

	useEffect(() => {
		if (outletUtilDaily) {
			setOutletDailyLoading(false);

			calculateOutletDaily(outletUtilDaily);
		}
	}, [outletUtilDaily]);

	// console.log('annualUtil', annualUtil)
	const handleChangeOutletId = (value, string) => {
		// console.log(`outletId `, value, string);
		setOutletId(value);
		setOutletName(string.label);
	};

	const yearChange = (value, selectedOptions) => {
		// console.log(value, selectedOptions);
		setYear(value[0]);
	};

	const monthChange = (value, selectedOptions) => {
		// console.log(selectedOptions);
		setMonth(selectedOptions[0].value);
		setMonthStr(selectedOptions[0].label);
	};

	const filterSearch = () => {
		if (!year && !month) {
			return setSearchNow(false);
		} else {
			setSearchNow(true);
		}
	};

	const filter = (inputValue, path) =>
		path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	const handleChangeOutletIds = (value, string) => {
		setOutletIds(value);
	};

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};
	// console.log('machineData', machineData);

	return (
		<div>
			{calculateOutlets}

			<div className='d-flex justify-content-between'>All Outlets Machine Utilization</div>

			<div style={{ marginBottom: '.5rem' }}>
				{distributor ? (
					<Select
						style={{ width: '11.5rem', marginRight: '1rem' }}
						value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
						onChange={handleChangeOperatorId}
						options={operatorsOptions}
					/>
				) : null}
				<Select
					mode='multiple'
					allowClear
					style={{ width: '11.5rem', marginRight: '1rem' }}
					placeholder='Select Outlets'
					onChange={handleChangeOutletIds}
					options={options}
				/>
				<Cascader
					defaultValue={[currentYear]}
					style={{ marginRight: '1rem' }}
					options={selectYear}
					onChange={yearChange}
					placeholder='Select Year'
					showSearch={{
						filter,
					}}
					// onSearch={(value) => console.log(value)}
				/>
				<Cascader
					defaultValue={[monthStr]}
					style={{ marginRight: '0.5rem' }}
					options={selectMonth}
					onChange={monthChange}
					placeholder='Select Month'
					showSearch={{
						filter,
					}}
					// onSearch={(value) => console.log(value)}
				/>

				{distributor && !operatorId ? null : (
					<Button
						onClick={() => (!machineUtilFilter ? dispatch(machineUtilizationFilter()) : filterSearch())}
						type='primary'
					>
						Filter
					</Button>
				)}
			</div>

			{distributor && !operatorId ? (
				<div className='border py-3'>
					<Empty />
				</div>
			) : null}

			{machineUtilFilter ? (
				<>
					<div className='card'>
						<div className='d-flex justify-content-between card-head-no-bdr'>
							<h5>Total Runtime of Machines By Outlet ({year})</h5>
						</div>
						<div className='card-body'>
							<div className='row flex-container'>
								<div className='col-md-9'>
									<div style={{ padding: '1.5em' }} className='card box'>
										{runtimeAnnualloading ? (
											<Skeleton active></Skeleton>
										) : (
											<TotalMachineRuntime
												annualUtil={annualUtil}
												machineData={machineData}
												setMachineData={setMachineData}
											/>
										)}
									</div>
								</div>
								<div className='col-md-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>Total Run Time</h5>
											<br />
											<span>
												{annualHours} <b>hrs</b>
											</span>
										</div>
									</div>
									<div className='card'>
										<div className='card-body'>
											<h5>Highest Run Time Outlet</h5>
											<br />
											<span>
												<b className='text-uppercase'>{annualTop && annualTop.name}</b>: {annualTop && annualTop.total}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-between card-head-no-bdr'>
							<h5>Total Monthly Machine Utilization ({monthStr})</h5>
						</div>
						<div className='card-body'>
							<div className='row flex-container'>
								<div className='col-md-9'>
									<div style={{ padding: '1.5em' }} className='card box'>
										{monthUtilLoading ? (
											<Skeleton style={{ height: '400px' }} active></Skeleton>
										) : (
											<DualAxeMonthly monthlyUtilData={monthlyUtilData} />
										)}
									</div>
								</div>
								<div className='col-md-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>Washer</h5>
											<br />
											<span>{monthlyHrs?.washer || 0} (hrs)</span>
											<Progress percent={(monthlyHrs?.washerPercent && monthlyHrs?.washerPercent?.toFixed(2)) || 0} />
										</div>
										<div className='card-body'>
											<h5>Dryer (hrs)</h5>
											<br />
											<span>{monthlyHrs?.dryer || 0} (hrs)</span>
											<Progress percent={(monthlyHrs?.dryerPercent && monthlyHrs?.dryerPercent?.toFixed(2)) || 0} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-head-no-bdr'>
							<h5>Daily Machine Utilization at ({outletName})</h5>

							<div>
								<Select
									style={{ width: '10rem' }}
									onChange={handleChangeOutletId}
									options={options}
									value={outletName ? outletName : 'Select Outlet'}
								/>
							</div>
						</div>

						<div className='card-body'>
							<div className='row flex-container'>
								<div className='col-md-9'>
									<div style={{ padding: '1.5em' }} className='card box'>
										{outletDailyloading ? (
											<Skeleton style={{ height: '400px' }} active></Skeleton>
										) : (
											<DualAxeDailyOutlet year={year} month={month} outletId={outletId} operatorId={operatorId} />
										)}
									</div>
								</div>
								<div className='col-md-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>Washer (hrs)</h5>
											<br />
											<span>{machineData?.outletUtilDaily?.washer || 0} (hrs)</span>

											<Progress
												percent={
													(machineData?.outletUtilDaily?.washerPercent &&
														machineData?.outletUtilDaily?.washerPercent?.toFixed(2)) ||
													0
												}
											/>
										</div>
										<div className='card-body'>
											<h5>Dryer (hrs)</h5>
											<br />
											<span>{machineData?.outletUtilDaily?.dryer || 0} (hrs)</span>
											<Progress
												percent={
													(machineData?.outletUtilDaily?.dryerPercent &&
														machineData?.outletUtilDaily?.dryerPercent?.toFixed(2)) ||
													0
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-evenly pie-chart-wrap pt-3'>
							<div className='pie-child'>
								<h5 className='ms-3'>Temperature Preference ({year})</h5>
								<DemoPie
									operatorId={operatorId}
									year={year}
									searchNow={searchNow}
									machineUtilFilter={machineUtilFilter}
								/>
							</div>
							<div className='pie-child'>
								<DemoDonutTime
									operatorId={operatorId}
									year={year}
									searchNow={searchNow}
									machineUtilFilter={machineUtilFilter}
								/>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-evenly pie-chart-wrap pt-3'>
							<div className='pie-child'>
								<h5 className='ms-3'>Temperature Preference ({monthStr})</h5>
								<DemoPieMonth
									operatorId={operatorId}
									year={year}
									month={month}
									searchNow={searchNow}
									machineUtilFilter={machineUtilFilter}
								/>
							</div>
							<div className='pie-child'>
								<DemoDonutTimeMonth
									operatorId={operatorId}
									year={year}
									month={month}
									monthStr={monthStr}
									searchNow={searchNow}
									machineUtilFilter={machineUtilFilter}
								/>
							</div>
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default MachineUtilization;
