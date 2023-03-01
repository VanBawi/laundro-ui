import React, { useState, useEffect } from 'react';
import './salesperformance.css';
import { Column } from '@ant-design/plots';
import { Progress, Cascader, DatePicker, Select, Skeleton, message, Empty, Button } from 'antd';
import SalesColumn from './salesColumn';
import SalesColumnDaily from './salesColumnDaily';
import TotalDailySales from './lineData';
import TotalOutletsSales from './outletBar';
import TypesDonut from './donutChart';
import WeightDemoDonut from './weightDonutChart';
import WeightDemoDonutMonth from './weightDonutChartMonth';
import TypesDonutMonth from './donutChartMonth';
import MonthlyOutletTable from './outletMonthlyTable';
import AnnualSalesTable from './annualSalesTable';
import DailySalesTable from './dailySalesTable';
import moment from 'moment';

// import SalesDailyBill from "./salesDailyBill";
import { useDispatch, useSelector } from 'react-redux';
import {
	annualSalesReport,
	totalDailySalesByMonth,
	totalOutletSalesByYear,
	totalOutletSalesMonth,
	annualBillReport,
	billReportMonth,
	dailySalesReport,
} from '../../../reducer/salesData';
import { selectYear, selectMonth, monthNamesShort } from '../../../utilities/helperData';

import SalesColumnMonth from './salesColumnMonth';
import { allOutlets } from '../../../reducer/outletReducer';
import { fetchOperators, salesDashboardFilter } from '../../../reducer/userReducer';
import { useCallback } from 'react';

// apis
// 1. total annual sales -
// 2. total daily sales (jan) -
// 3. sales by outlet in year -
// 4. sales by outlet in month (table) /
// 5. total annual bills by outlet -
// 6. total monthly bills by outlet /
// 7. daily sales by outlet /
// 8. daily bill amt by outlet -
// 9. sales distribution by type (year/month) -
// 10. sales distribution by weight (year/month) -

const SalesPerformance = () => {
	const dispatch = useDispatch();

	const { outlets } = useSelector((state) => state.outlets);
	const [toggleDaily, setToggleDaily] = useState(false);
	const [toggleAnnual, setToggleAnnual] = useState(false);

	const [totalAnnual, setTotalAnnual] = useState(0);
	const [dailySales, setDailySales] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalIncomeSales, setTotalIncomeSales] = useState(0);
	const [totalIncomeBill, setTotalIncomeBill] = useState(0);
	const [totalIncomeMonthBill, setTotalIncomeMonthBill] = useState(0);
	const [totalIncomeDailySale, setTotalIncomeDailySale] = useState(0);

	const [totalIncomeTop, setTotalIncomeTop] = useState('');
	const [totalIncomeSalesTop, setTotalIncomeSalesTop] = useState('');
	const [totalIncomeBillTop, setTotalIncomeBillTop] = useState('');
	const [totalIncomeMonthBillTop, setTotalIncomeMonthBillTop] = useState('');
	const [dailySaleTop, setDailySaleTop] = useState({
		topOutlet: '',
		topSales: 0,
	});

	var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
	const [date, setDate] = useState(utc);

	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [annualMethod, setAnnualMethod] = useState({});
	const [dailyMethod, setDailyMethod] = useState({});
	const [monthStr, setMonthStr] = useState(monthNamesShort[new Date().getMonth()]);
	const [options, setOptions] = useState([]);

	const [annualLoading, setAnnualLoading] = useState(true);
	const [dailyLoading, setDailyLoading] = useState(true);
	const [outletYearloading, setOutletYearLoading] = useState(true);
	const [outletMonthloading, setOutletMonthLoading] = useState(true);
	const [billsYearloading, setBillsYearLoading] = useState(true);
	const [billsOutletloading, setBillsOutletLoading] = useState(true);
	const [dailySalesloading, setDailySalesLoading] = useState(true);

	const [outletIds, setOutletIds] = useState([]);

	const [searchNow, setSearchNow] = useState(false);
	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	const {
		annual,
		daily,
		outletMonth,
		billAnnual,
		billMonth,
		salesDaily,
		error,
		outletSalesData,
		// loading,
	} = useSelector((state) => state.sales);

	const { distributor, operators, staff, operator } = useSelector((state) => state.user);
	const { salesPerformanceFilter } = useSelector((state) => state.filterReducer);
	const [mchType, setMchType] = useState('washer');
	const [mchType2, setMchType2] = useState('washer');
	// console.log('operators', operators);

	useEffect(() => {
		if (operator || staff) {
			dispatch(allOutlets());
		}
	}, [dispatch, operator, staff]);

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
		if (distributor && operatorId) {
			dispatch(allOutlets(operatorId));
		}
	}, [dispatch, operatorId, distributor]);
	// console.log(outlets);

	useEffect(() => {
		if (outlets) {
			let outletArr = [];
			for (let i = 0; i < outlets.length; i++) {
				outletArr.push({ value: outlets[i].id, label: outlets[i].fullname });
			}
			setOptions(outletArr);
		}
	}, [outlets]);

	// console.log(options);

	// Total Annual Sales
	useEffect(() => {
		if (salesPerformanceFilter) {
			// console.log('hit top search 1');
			setAnnualLoading(true);
			dispatch(annualSalesReport({ year, outlets: outletIds, operatorId }));
		}
	}, [dispatch, salesPerformanceFilter]);

	useEffect(() => {
		if (searchNow) {
			// console.log('hit top searchNow');
			setAnnualLoading(true);
			dispatch(annualSalesReport({ year, outlets: outletIds, operatorId }));
			setSearchNow(false);
			setTotalIncomeTop('');
			setTotalIncomeSalesTop('');
		}
	}, [dispatch, searchNow]);

	// console.log('searchNow', searchNow);

	const calculateAnnualData = useCallback(
		(annual) => {
			if (annual) {
				// console.log('calculating')
				const top = annual.map((each) => each.total).reduce((a, b) => a + b, 0);
				const coin = annual.reduce((a, b) => a + b.coin, 0);
				const epay = annual.reduce((a, b) => a + b.epay, 0);
				const coinPercent = (coin / top) * 100;
				const epayPercent = (epay / top) * 100;
				setTotalAnnual(top);
				setAnnualMethod({
					...annualMethod,
					coin: coin,
					epay: epay,
					epayPercent: epayPercent,
					coinPercent: coinPercent,
				});
			}
		},
		[annual]
	);

	// console.log('annual', annual);

	// Total Daily Sales
	useEffect(() => {
		if (annual && salesPerformanceFilter) {
			// console.log('hit annual');
			setAnnualLoading(false);
			setDailyLoading(true);

			dispatch(totalDailySalesByMonth({ year, month, outlets: outletIds, operatorId }));

			calculateAnnualData(annual);
		}
	}, [dispatch, annual, salesPerformanceFilter]);
	// console.log(annualMethod);

	const calculateDailyData = useCallback(
		(daily) => {
			if (daily) {
				// console.log('calculating')
				const total = daily
					.map((e) => {
						let num = e.total;
						return Number.parseInt(num, 10);
					})
					.reduce((a, b) => a + b, 0);

				setDailySales(total);

				const coin = daily
					.map((e) => {
						let num = e.coin;
						return Number.parseInt(num, 10);
					})
					.reduce((a, b) => a + b, 0);

				const epay = daily
					.map((e) => {
						let num = e.epay;
						return Number.parseInt(num, 10);
					})
					.reduce((a, b) => a + b, 0);

				const coinPercent = (coin / total) * 100;
				const epayPercent = (epay / total) * 100;

				setDailyMethod({
					...dailyMethod,
					coin: coin,
					epay: epay,
					epayPercent: epayPercent,
					coinPercent: coinPercent,
				});
			}
		},
		[daily]
	);

	// Total Sales by Outlet (year)
	useEffect(() => {
		if (daily) {
			setDailyLoading(false);
			dispatch(totalOutletSalesByYear(year, operatorId));

			calculateDailyData(daily);
		}
	}, [dispatch, daily]);

	// console.log('outletSalesData', outletSalesData)

	// Total Sales By Outlet in (month) (table)
	useEffect(() => {
		if (outletSalesData) {
			setOutletYearLoading(false);

			dispatch(totalOutletSalesMonth(year, month, operatorId));
			const total =
				outletSalesData.length && [...outletSalesData].map((e) => Number(e.total)).reduce((a, b) => a + b, 0);

			setTotalIncome(total);
			const top = outletSalesData.length && [...outletSalesData].sort((a, b) => a.total - b.total);
			if (top[0]) {
				setTotalIncomeTop(top[0]);
			}
		}
	}, [dispatch, outletSalesData]);

	// console.log('outletMonth', outletMonth);

	// console.log('outletSalesData', outletSalesData);
	// Total Bills By Outlet (year)
	useEffect(() => {
		if (outletMonth) {
			setOutletMonthLoading(false);
			dispatch(annualBillReport(year, operatorId));
			const total = outletMonth.length && [...outletMonth].map((e) => Number(e.total)).reduce((a, b) => a + b, 0);

			setTotalIncomeSales(total);
			const top = outletMonth.length && [...outletMonth].sort((a, b) => a.total - b.total);
			if (top[0]) {
				setTotalIncomeSalesTop(top[0]);
			}
		}
	}, [dispatch, outletMonth]);

	// console.log('outletMonth', outletMonth)

	// Bill Amount By Outlets Per Month (month)
	useEffect(() => {
		if (billAnnual) {
			setBillsYearLoading(false);
			dispatch(billReportMonth(year, month, operatorId));
			const total = billAnnual.length && [...billAnnual].map((e) => Number(e.amount)).reduce((a, b) => a + b, 0);

			setTotalIncomeBill(total);

			const top = billAnnual.length && [...billAnnual].sort((a, b) => a.amount - b.amount);
			if (top[0]) {
				setTotalIncomeBillTop(top[0]);
			}
		}
	}, [dispatch, billAnnual]);

	// // console.log('billAnnual', billAnnual)

	// Daily Sales by Outlet (date)
	useEffect(() => {
		if (billMonth) {
			setBillsOutletLoading(false);

			dispatch(dailySalesReport(date, operatorId));

			const total = billMonth.length && [...billMonth].map((e) => Number(e.amount)).reduce((a, b) => a + b, 0);

			setTotalIncomeMonthBill(total);
			const top = billMonth.length && [...billMonth].sort((a, b) => a.amount - b.amount);
			if (top[0]) {
				setTotalIncomeMonthBillTop(top[0]);
			}
		}
	}, [dispatch, billMonth]);

	useEffect(() => {
		if (salesDaily) {
			setDailySalesLoading(false);
			const total = [...salesDaily].map((e) => Number(e.total)).reduce((a, b) => a + b, 0);
			setTotalIncomeDailySale(total);

			if (salesDaily[0]) {
				setDailySaleTop({
					...dailySaleTop,
					topOutlet: salesDaily[0] && salesDaily[0].name,
					topSales: salesDaily[0] && salesDaily[0].total,
				});
			}
		}
	}, [salesDaily]);

	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
			}
		}
	}, [error]);

	const yearChange = (value, selectedOptions) => {
		setYear(value[0]);
	};
	const monthChange = (value, selectedOptions) => {
		setMonth(value[0]);
		setMonthStr(selectedOptions[0].label);
	};
	// console.log('utc', utc);
	const onChangeDate = (date, dateString) => {
		// console.log('dateString', dateString, date);
		setDailySalesLoading(true);
		if (!dateString) {
			setDate(utc);
			dispatch(dailySalesReport(utc));
		} else {
			setDate(moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD'));
			dispatch(dailySalesReport(moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')));
		}
	};

	const filter = (inputValue, path) =>
		path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	const config = {
		data: annual ? annual : [],
		xField: 'month',
		yField: 'total',
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
	};

	const filterSearch = () => {
		if (!year && !month) {
			return setSearchNow(false);
		} else {
			setSearchNow(true);
		}
	};

	const handleChangeOutletIds = (value, string) => {
		setOutletIds(value);
	};

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};

	// console.log('salesPerformanceFilter', salesPerformanceFilter);
	// console.log('daily', daily);
	// console.log('operatorId', operatorId);
	// console.log('operatorsOptions', operatorsOptions);

	return (
		<div>
			<div className='d-flex justify-content-between'>All Outlets Yearly Sales</div>

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
					defaultValue={[new Date().getFullYear()]}
					style={{ marginRight: '1rem' }}
					options={selectYear}
					onChange={yearChange}
					placeholder='Select Year'
					showSearch={{ filter }}
					// onSearch={(value) => console.log(value)}
				/>
				<Cascader
					defaultValue={[monthNamesShort[new Date().getMonth()]]}
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
						onClick={() => (!salesPerformanceFilter ? dispatch(salesDashboardFilter()) : filterSearch())}
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

			{salesPerformanceFilter ? (
				<>
					<div className='d-flex flex-even flex-container'>
						<div className='card'>
							<div className='d-flex justify-content-between card-head-no-bdr'>
								<h5>Total Annual Sales ({year})</h5>
								<div>
									<input
										onClick={() => setToggleAnnual(!toggleAnnual)}
										type='checkbox'
										style={{ marginRight: '.5em' }}
									/>
									Toggle Table
								</div>
							</div>

							<div className='card-body'>
								<div>
									<div>
										<div style={{ padding: '1rem' }} className='card'>
											{toggleAnnual ? annual ? <AnnualSalesTable annual={annual} /> : <Empty /> : null}
											{annualLoading ? (
												<Skeleton active></Skeleton>
											) : (
												<Column {...config} style={{ display: toggleAnnual ? 'none' : 'block' }} />
											)}
										</div>
									</div>
									<div>
										<div className='card'>
											<div className='card-head-no-bdr'>
												<h5>Your Sales in {year}</h5>
											</div>
											<div className='card-body'>
												<div style={{ margin: '2rem 0' }}>
													<span className='status-gradient-info blue'></span>
													<span style={{ fontWeight: '700' }}>Sales (Coin)</span>
													<br />
													{/* {console.log('annualMethod', annualMethod)} */}
													<span>RM {(annualMethod?.coin && annualMethod?.coin.toFixed(2)) || 0}</span>
													<Progress
														percent={(annualMethod?.coinPercent && annualMethod?.coinPercent.toFixed(2)) || 0}
														size='small'
													/>
												</div>
												<div style={{ margin: '3rem 0' }}>
													<span className='status-gradient-info green'></span>
													<span style={{ fontWeight: '700' }}>Sales (Epay)</span>
													<br />
													<span>RM {annualMethod?.epay?.toFixed(2) || 0}</span>
													<Progress
														percent={(annualMethod?.epayPercent && annualMethod?.epayPercent.toFixed(2)) || 0}
														size='small'
													/>
												</div>
												<span style={{ padding: '1rem 0', fontWeight: '700' }}>Total Sales</span>
												<p style={{ margin: '3rem 0' }}>
													RM <b>{totalAnnual}</b>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='card '>
							<div style={{ display: 'flex', justifyContent: 'space-between' }} className='card-head-no-bdr'>
								<h5>Total Daily Sales ({monthStr})</h5>
								<div>
									<input onClick={() => setToggleDaily(!toggleDaily)} type='checkbox' style={{ marginRight: '.5em' }} />
									Toggle Table
								</div>
							</div>
							<div className='card-body '>
								<div>
									<div>
										<div style={{ padding: '1rem' }} className='card'>
											{toggleDaily ? daily ? <DailySalesTable daily={daily} /> : <Empty /> : null}
											{dailyLoading ? (
												<Skeleton active></Skeleton>
											) : (
												<TotalDailySales daily={daily} toggleDaily={toggleDaily} />
											)}
										</div>
										<div className='card'>
											<div className='card-head-no-bdr'>
												<h5>Your Sales in ({monthStr})</h5>
											</div>
											<div className='card-body'>
												<div style={{ margin: '2rem 0' }}>
													<span className='status-gradient-info blue'></span>
													<span style={{ fontWeight: '700' }}>Sales (Coin)</span>
													<br />
													<span> RM {(dailyMethod?.coin && dailyMethod?.coin?.toFixed(2)) || 0}</span>
													<Progress
														percent={(dailyMethod?.coinPercent && dailyMethod?.coinPercent?.toFixed(2)) || 0}
														size='small'
													/>
												</div>
												<div style={{ margin: '3rem 0' }}>
													<span className='status-gradient-info green'></span>
													<span style={{ fontWeight: '700' }}>Sales (Epay)</span>
													<br />
													<span> RM {(dailyMethod?.epay && dailyMethod?.epay?.toFixed(2)) || 0}</span>
													<Progress
														percent={(dailyMethod?.epayPercent && dailyMethod?.epayPercent?.toFixed(2)) || 0}
														size='small'
													/>
												</div>
												<span style={{ padding: '1rem 0', fontWeight: '700' }}>Total Sales</span>
												<p style={{ margin: '3rem 0' }}>
													RM <b>{dailySales}</b>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='card-head-no-bdr'>
							<h5>Total Sales By Outlet in ({year})</h5>
						</div>
						<div className=''>
							<div className='flex-container'>
								<div className='card-body'>
									<div style={{ padding: '1.5em' }} className='card '>
										{outletYearloading ? (
											<Skeleton active></Skeleton>
										) : (
											<TotalOutletsSales outletSales={outletSalesData} />
										)}
									</div>
								</div>
								<div></div>
								{/* <div className='card-body'>
									<div className='card'>
										<div className='card-body'>
											<h5 style={{ fontWeight: '700' }}>Total Income</h5>
											<br />
											<p>
												<b>RM </b> {totalIncome}
											</p>
										</div>
									</div>
									<div className='card box'>
										<div className='card-body'>
											<h5 style={{ fontWeight: '700' }}>Highest Sales Outlet</h5>
											<br />
											<p>
												<b>{totalIncomeTop ? totalIncomeTop.name.toUpperCase() : ''}</b>
												<div>{totalIncomeTop ? totalIncomeTop.total : 0}</div>
											</p>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-between card-head-no-bdr'>
							<h5>Total Sales By Outlet in ({monthStr})</h5>
						</div>
						<div className='card-body'>
							<div className=''>
								<div>
									<div className='box'>
										{outletMonthloading ? (
											<Skeleton active></Skeleton>
										) : (
											<MonthlyOutletTable outletMonth={outletMonth} />
										)}
									</div>
								</div>
								<div></div>
								{/* <div>
									<div className='card box'>
										<div className='card-body'>
											<h5>Total Income</h5>
											<br />
											<span>
												<b>RM</b> {totalIncomeSales}
											</span>
										</div>
									</div>
									<div className='card box'>
										<div className='card-body'>
											<h5>Highest Sales Outlet</h5>
											<br />
											<span>
												<p>
													<b>{totalIncomeSalesTop ? totalIncomeSalesTop.name.toUpperCase() : ''}</b>
													<div>RM {totalIncomeSalesTop ? totalIncomeSalesTop.total : 0}</div>
												</p>
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>

					{billAnnual && billAnnual.length ? (
						<div className='card'>
							<div style={{ display: 'flex', justifyContent: 'space-between' }} className='card-head-no-bdr'>
								<h5>Total Bills By Outlet ({year})</h5>
							</div>
							<div className='card-body'>
								<div className='row flex-container'>
									<div className='col-md-9'>
										<div style={{ padding: '1.5em' }} className='card box'>
											{billsYearloading ? <Skeleton active></Skeleton> : <SalesColumn billAnnual={billAnnual} />}
										</div>
									</div>
									<div className='col-md-3'>
										<div className='card'>
											<div className='card-body'>
												<h5>Total Income</h5>
												<br />
												<h5>
													<b>RM</b> {totalIncomeBill}
												</h5>
											</div>
										</div>
										<div className='card'>
											<div className='card-body'>
												<h5>Highest Sales Outlet</h5>
												<br />
												<div>
													<b>{totalIncomeBillTop ? totalIncomeBillTop.name.toUpperCase() : ''}</b>
													<div>RM {totalIncomeBillTop ? totalIncomeBillTop.amount : 0}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}

					{/* {console.log('billMonth', billMonth)} */}
					{billMonth && billMonth.length ? (
						<div className='card'>
							<div style={{ display: 'flex', justifyContent: 'space-between' }} className='card-head-no-bdr'>
								<h5>Bill Amount By Outlets Per Month ({monthStr})</h5>
							</div>
							<div className='card-body'>
								<div className='row flex-container'>
									<div className='col-md-9'>
										<div style={{ padding: '1.5em' }} className='card box'>
											{billsOutletloading ? <Skeleton active></Skeleton> : <SalesColumnMonth billMonth={billMonth} />}
										</div>
									</div>
									<div className='col-md-3'>
										<div className='card'>
											<div className='card-body'>
												<h5>Total Income</h5>
												<br />
												<span>
													<b>RM</b> {totalIncomeMonthBill}
												</span>
											</div>
										</div>
										<div className='card'>
											<div className='card-body'>
												<h5>Highest Sales Outlet</h5>
												<br />
												<span>
													<div>
														<b>{totalIncomeMonthBillTop ? totalIncomeMonthBillTop.name.toUpperCase() : ''}</b>
														<div>RM {totalIncomeMonthBillTop ? totalIncomeMonthBillTop.amount : 0}</div>
													</div>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}

					<div className='card'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }} className='card-head-no-bdr'>
							<h5>
								Daily Sales by Outlet
								<DatePicker
									defaultValue={moment()}
									format={'DD/MM/YYYY'}
									style={{ marginLeft: '1.25rem' }}
									onChange={onChangeDate}
								/>
							</h5>
						</div>
						<div className='card-body'>
							<div className='row flex-container'>
								<div className='col-md-9'>
									<div style={{ padding: '1.5em', height: '450px' }} className='card box'>
										{dailySalesloading ? (
											<Skeleton active></Skeleton>
										) : salesDaily.length ? (
											<SalesColumnDaily salesDaily={salesDaily} />
										) : (
											<Empty />
										)}
									</div>
								</div>
								<div className='col-md-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>Total Income</h5>
											<br />
											<span>
												<b>RM</b> {totalIncomeDailySale}
											</span>
										</div>
									</div>
									<div className='card'>
										<div className='card-body'>
											<h5>Highest Sales Outlet</h5>
											<br />
											<span>
												<div>
													<b className='text-uppercase'>{dailySaleTop.topOutlet}</b>
													<div>RM {dailySaleTop.topSales}</div>
												</div>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-evenly pie-chart-wrap card-body'>
							<div className='pie-child'>
								<h5>Sales Distribution % by Types ({year})</h5>
								<div className='box'>
									<TypesDonut
										operatorId={operatorId}
										year={year}
										salesPerformanceFilter={salesPerformanceFilter}
										searchNow={searchNow}
									/>
								</div>
							</div>
							<div className='pie-child'>
								<h5>Sales Distribution % by Kg ({year})</h5>
								<Button
									size='small'
									className='me-1'
									type={mchType === 'washer' ? 'primary' : ''}
									onClick={() => setMchType('washer')}
								>
									Washer
								</Button>
								<Button
									size='small'
									className='me-1'
									type={mchType === 'dryer' ? 'primary' : ''}
									onClick={() => setMchType('dryer')}
								>
									Dryer
								</Button>
								<div className='box'>
									<WeightDemoDonut
										operatorId={operatorId}
										salesPerformanceFilter={salesPerformanceFilter}
										year={year}
										searchNow={searchNow}
										mchType={mchType}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='d-flex justify-content-evenly pie-chart-wrap card-body'>
							<div className='pie-child'>
								<h5>Sales Distribution % by Types ({monthStr})</h5>
								<div className='box'>
									<TypesDonutMonth
										operatorId={operatorId}
										salesPerformanceFilter={salesPerformanceFilter}
										year={year}
										month={month}
										searchNow={searchNow}
									/>
								</div>
							</div>
							<div className='pie-child'>
								<h5>Sales Distribution % by Kg ({monthStr})</h5>
								<Button
									size='small'
									className='me-1'
									type={mchType2 === 'washer' ? 'primary' : ''}
									onClick={() => setMchType2('washer')}
								>
									Washer
								</Button>
								<Button
									size='small'
									className='me-1'
									type={mchType2 === 'dryer' ? 'primary' : ''}
									onClick={() => setMchType2('dryer')}
								>
									Dryer
								</Button>
								<div className='box'>
									<WeightDemoDonutMonth
										operatorId={operatorId}
										salesPerformanceFilter={salesPerformanceFilter}
										year={year}
										month={month}
										searchNow={searchNow}
										mchType={mchType2}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default SalesPerformance;
