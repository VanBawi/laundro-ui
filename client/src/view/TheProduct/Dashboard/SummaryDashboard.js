import React, { useEffect, useState } from 'react';
import './dashboard.css';
import '../Sales Performance/salesperformance.css';
import washerIdle from '../../../images/washer-idle.png';
import coin from '../../../images/coin.png';
import epay from '../../../images/epay.png';
import manual from '../../../images/manual.png';
import vending from '../../../images/others/vending.png';
import washer from '../../../images/others/washer.png';
import dryer from '../../../images/others/dryer.png';
import { Skeleton, Empty, Select } from 'antd';
import Last7DaysLineChart from './Last7DaysLineChart';
import TopOutletTable from './TopOutletTable';
import { Column } from '@ant-design/plots';

import {
	machineSalesData,
	machineStatus,
	annualSalesByYear,
	channelSalesData,
	weeklySales,
	topSales,
} from '../../../reducer/sumDashReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOperators } from '../../../reducer/userReducer';
import { useLocation } from 'react-router-dom';
// import { DollarCircleOutlined, MailOutlined, HomeOutlined, ToolOutlined, SwitcherOutlined } from '@ant-design/icons';
const SummaryDashboard = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { channelSales, machineSales, status } = useSelector((state) => state.dashboard);

	const { annualSales, topSalesData, weeklySalesData } = useSelector((state) => state.summaryAnnual);

	const [statusLoading, setStatusLoading] = useState(true);
	const [channelLoading, setChannelLoading] = useState(true);
	const [machineLoading, setMachineLoading] = useState(true);
	const [annualLoading, setAnnualLoading] = useState(true);
	const [weekLoading, setWeekLoading] = useState(true);
	const [outletsLoading, setOutletsLoading] = useState(true);
	const [annualEarnings, setAnnualEarnings] = useState(0);

	const [operatorsOptions, setOperatorsOptions] = useState([]);
	const [operatorId, setOperatorId] = useState('');

	const { distributor, operator, staff, operators } = useSelector((state) => state.user);

	const stateData = location.state;

	// console.log('staff', staff);
	// console.log('distributor, operator, operators', distributor, operator, operators);

	// console.log('operator', operator);
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

	// useEffect(() => {
	// 	if (distributor && !operators.length) {
	// 		setStatusLoading(false);
	// 		setChannelLoading(false);
	// 		setMachineLoading(false);
	// 		setAnnualLoading(false);
	// 		setWeekLoading(false);
	// 		setOutletsLoading(false);
	// 	}
	// }, [distributor, operators]);

	// console.log('operators', operators);

	useEffect(() => {
		if (operator || staff || stateData) {
			// console.log('hit this machine status query');
			dispatch(machineStatus(new Date().getFullYear()));
		}
	}, [dispatch, operator, staff, stateData]);
	// console.log('operator', operator);

	useEffect(() => {
		if (operatorId) {
			dispatch(machineStatus(new Date().getFullYear(), operatorId));
		}
	}, [dispatch, operatorId, distributor]);

	useEffect(() => {
		if (status) {
			setStatusLoading(false);
			dispatch(machineSalesData(new Date().getFullYear(), operatorId));
		}
	}, [dispatch, status]);

	// console.log('status', status);

	useEffect(() => {
		if (machineSales) {
			setMachineLoading(false);
			dispatch(channelSalesData(new Date().getFullYear(), operatorId));
		}
	}, [dispatch, machineSales]);

	useEffect(() => {
		if (channelSales) {
			setChannelLoading(false);
			dispatch(weeklySales(new Date().getFullYear(), operatorId));
		}
	}, [dispatch, channelSales]);

	useEffect(() => {
		if (weeklySalesData) {
			setWeekLoading(false);
			dispatch(topSales(new Date().getFullYear(), operatorId));
		}
	}, [dispatch, weeklySalesData]);

	useEffect(() => {
		if (topSalesData) {
			setOutletsLoading(false);
			dispatch(annualSalesByYear({ year: new Date().getFullYear(), operatorId }));
		}
	}, [dispatch, topSalesData]);

	useEffect(() => {
		if (annualSales) {
			setAnnualLoading(false);
			let earnings = annualSales.reduce((a, b) => a + b.total, 0);
			setAnnualEarnings(earnings);
		}
	}, [annualSales]);

	const barConfig = {
		data: annualSales ? annualSales : [],
		xField: 'month',
		yField: 'total',
		responsive: true,
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
				color: '#12cbde',
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: 'Sales',
			},
			sales: {
				alias: 'Sales',
			},
		},
	};

	const todayDate = new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('/');

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};
	// console.log('annualSales,', annualSales)
	// console.log('channelSales', channelSales)
	// console.log(' machineSales', machineSales)
	// console.log('status', status)
	// console.log('weeklySalesData,', weeklySalesData)
	// console.log('topSalesData,', topSalesData)
	// console.log('operatorId', operatorId);
	// console.log('machineSales', machineSales);
	return (
		<React.Fragment>
			<div>
				<div className='d-flex justify-content-between' style={{ width: '100%' }}>
					<div>Summary Dashboard</div>

					{distributor ? (
						<Select
							style={{ width: '12rem', marginRight: '1rem' }}
							value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
							onChange={handleChangeOperatorId}
							options={operatorsOptions}
						/>
					) : null}
				</div>

				<div className='contents-container'>
					{/* 70% later change when sidebar contents Updates have */}
					<div>
						{statusLoading ? (
							<Skeleton active></Skeleton>
						) : status ? (
							<div className='machines-list-container'>
								<div className='machines-list-box'>
									<div>
										<img style={{ width: '4rem' }} src={washerIdle} alt='' />
									</div>

									<div className='mt-2'>
										{status && status.running} Machines
										<span style={{ color: 'green' }}> Running</span>
									</div>
								</div>
								<div className='machines-list-box'>
									<img style={{ width: '4rem' }} src={washerIdle} alt='' />

									<div className='mt-2'>
										{status && status.idle} Machines
										<span style={{ color: '#e69b00' }}> Idle</span>
									</div>
								</div>
								<div className='machines-list-box'>
									<img style={{ width: '4rem' }} src={washerIdle} alt='' />

									<div className='mt-2'>
										{status && status.offline} Machines
										<span style={{ color: 'red' }}> Offline</span>
									</div>
								</div>
							</div>
						) : (
							<Empty />
						)}

						<div className='sales-channel-container'>
							<div className='sales-channel-box'>
								<div className='card-head mt-3'>
									<h6 className='card-title'>
										Sales by Channels -<div>{todayDate}</div>
									</h6>
								</div>
								{channelLoading ? (
									<Skeleton active></Skeleton>
								) : (
									<div className='mt-3'>
										{channelSales ? (
											<div className='d-flex'>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={coin} alt='' />
													<p className='payment-text'>Coins</p>
													<span>RM {channelSales.coin ? channelSales.coin : 0}</span>
												</div>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={epay} alt='' />
													<p className='payment-text'>Epayment</p>
													<span>RM {channelSales.epay ? channelSales.epay : 0}</span>
												</div>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={manual} alt='' />
													<p className='payment-text'>Manual</p>
													<span>RM {channelSales.manual ? channelSales.manual : 0}</span>
												</div>
											</div>
										) : null}
									</div>
								)}
							</div>
							<div className='sales-channel-box'>
								<div className='card-head  mt-3'>
									<h6 className='card-title'>
										Sales by Machines -<div>{todayDate}</div>
									</h6>
								</div>
								{machineLoading ? (
									<Skeleton active></Skeleton>
								) : (
									<div>
										{machineSales ? (
											<div className='d-flex mt-3'>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={washer} alt='' />
													<p className='payment-text'>Washer</p>
													<span>RM {machineSales.washer ? machineSales.washer : 0}</span>
												</div>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={dryer} alt='' />
													<p className='payment-text'>Dryer</p>
													<span>RM {machineSales.dryer ? machineSales.dryer : 0}</span>
												</div>
												<div className='col-4 text-center'>
													<img className='channel-icon-width' src={vending} alt='' />
													<p className='payment-text'>Vending</p>
													<span>RM {machineSales.vending ? machineSales.vending : 0}</span>
												</div>
											</div>
										) : null}
									</div>
								)}
							</div>
						</div>
						<div className='mt-5 '>
							<h3>Total Annual Sales</h3>
							<h4 className='total-sales'>
								<b>RM</b> {annualEarnings}
							</h4>
							<div className='card px-3 py-3'>
								{annualLoading ? <Skeleton active></Skeleton> : <Column style={{ height: '350px' }} {...barConfig} />}
							</div>
						</div>
						<div className='mt-5 '>
							<h3>Last 7 Days Sales</h3>

							<div className='card px-2 pb-3 mt-2'>
								{weekLoading ? <Skeleton active></Skeleton> : <Last7DaysLineChart weeklySalesData={weeklySalesData} />}
							</div>
						</div>

						<h3 className='mt-5'>Top Outlets</h3>
						<div className='mt-2'>
							{outletsLoading ? <Skeleton active></Skeleton> : <TopOutletTable topSalesData={topSalesData} />}
						</div>
					</div>

					{/* 30% later change when sidebar contents Updates have */}
					{/* <div style={{ height: 'fit-content' }}>
						<div className='sidebar-updates box'>
							<h4 className='sidebar-heading'>Updates</h4>
							<br />
							<div className='icons d-flex justify-content-evenly'>
								<DollarCircleOutlined className='updates-icon' />
								<MailOutlined className='updates-icon' />
								<HomeOutlined className='updates-icon' />
								<a href='/errorReporting'>
									<ToolOutlined className='updates-icon' />
								</a>
							</div>
						</div>
						<div className='sidebar-notice box sidebar-updates'>
							<h4 className='sidebar-heading'>Notice</h4>

							<br />
							<p></p>
							<br />
							<h4 className='sidebar-heading'>News</h4>
							<br />
							<div style={{ padding: '.5rem' }}>
								<SwitcherOutlined
									style={{
										fontSize: '2.3rem',
										marginTop: '.75rem',
										color: '#12cbde ',
									}}
								/>
								<h5 style={{ display: 'inline', margin: '0 .5rem' }}>Promotion</h5>
								<p></p>
							</div>
							<div style={{ padding: '.5rem' }}>
								<SwitcherOutlined
									style={{
										fontSize: '2.3rem',
										marginTop: '.75rem',
										color: '#12cbde ',
									}}
								/>
								<h5 style={{ display: 'inline', margin: '0 .5rem' }}>Promotion</h5>
								<p></p>
							</div>
							<div style={{ padding: '.5rem' }}>
								<SwitcherOutlined
									style={{
										fontSize: '2.3rem',
										marginTop: '.75rem',
										color: '#12cbde',
									}}
								/>
								<h5 style={{ display: 'inline', margin: '0 .5rem' }}>Promotion</h5>
								<p></p>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</React.Fragment>
	);
};

export default SummaryDashboard;
