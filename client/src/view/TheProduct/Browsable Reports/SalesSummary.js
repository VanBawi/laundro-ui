import React, { useEffect, useState } from 'react';
import '../Sales Performance/salesperformance.css';
import './browsablereports.css';
import { CSVLink } from 'react-csv';
import { Table, DatePicker, Button, Select, Skeleton, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { summaryReport } from '../../../reducer/reportsReducer';
import { allOutlets } from '../../../reducer/outletReducer';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { fetchOperators } from '../../../reducer/userReducer';
import { SearchOutlined } from '@ant-design/icons';
import { sorterFunction } from './tableHeaderHelper';
const { RangePicker } = DatePicker;
const { Column } = Table;

const SalesSummary = () => {
	const { summary } = useSelector((state) => state.reports);
	const { outlets } = useSelector((state) => state.outlets);
	const dispatch = useDispatch();
	const [date, setDate] = useState([]);

	const [searchText, setSearchText] = useState('');
	const [initialData, setInitialData] = useState([]);

	const [rowsData, setRowsData] = useState([]);

	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState([]);
	const [method, setMethod] = useState();
	const [loading, setLoading] = useState(false);
	const { distributor, operator, operators } = useSelector((state) => state.user);

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');
	// backend should receive startdate, enddate, arr of outlets
	// console.log('data', data);
	useEffect(() => {
		if (operator) {
			dispatch(allOutlets());
		}
	}, [dispatch, operator]);

	useEffect(() => {
		if (distributor && operatorId) {
			dispatch(allOutlets(operatorId));
		}
	}, [dispatch, distributor, operatorId]);

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
		let optionsObj = [];

		for (let i = 0; i < outlets.length; i++) {
			optionsObj.push({
				value: outlets[i].id,
				label: outlets[i].fullname,
			});
		}

		setOptions(optionsObj);
	}, [outlets]);

	function getData() {
		let postObj = {
			outlets: selected,
			startDate: `${date[0]}`,
			endDate: `${date[1]}`,
			method: method,
			operatorId: operatorId,
		};

		if (date.length === 2) {
			dispatch(summaryReport(postObj));
			setLoading(true);
		}
	}

	// console.log('selected', selected);
	useEffect(() => {
		if (summary) {
			setLoading(false);
			let array = [];
			[...summary].forEach((each) => {
				if (each.data) {
					each.data.forEach((e) => {
						let newData = { ...e };
						newData.name = each.name;
						array.push(newData);
					});
				}
			});
			// console.log('array', array);

			setInitialData(array);
			setRowsData(array);
		}
	}, [summary]);

	// console.log('data', data);

	const handleChange = (value) => {
		setSelected(value);
	};

	const methodChange = (value) => {
		setMethod(value);
	};

	const getDates = (value, dateString) => {
		setDate(dateString);
	};

	const items = [
		{
			label: 'Coin',
			value: 'coin',
		},
		{
			label: 'Epay',
			value: 'epay',
		},
		{
			label: 'Manual',
			value: 'manual',
		},
		{
			label: 'All',
			value: '',
		},
	];

	// console.log('machineLoggings', machineLoggings);
	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};

	function filterByValue(array, value) {
		return array.filter((data) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
	}

	const onSearch = (e) => {
		if (!searchText) return;
	};

	function searchBarOnChange(value) {
		setSearchText(value);
		if (!value) {
			setSearchText('');
			setRowsData(initialData);
		} else {
			const filteredData = filterByValue(initialData, value);
			if (filteredData.length) {
				setRowsData(filteredData);
			} else {
				setRowsData([]);
			}
		}
	}

	// console.log('selected', selected);

	return (
		<div>
			Sales Summary
			<div style={{ marginTop: '1rem' }}>
				{distributor ? (
					<Select
						style={{ width: '12rem', marginRight: '1rem' }}
						value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
						onChange={handleChangeOperatorId}
						options={operatorsOptions}
					/>
				) : null}

				<Select
					defaultValue='Choose Method'
					style={{
						width: 200,
						marginRight: '0.5rem',
					}}
					onChange={methodChange}
					options={items}
				/>
				<RangePicker onChange={getDates} style={{ marginRight: '0.5rem' }} />
				<Select
					allowClear
					style={{
						width: '9rem',
						marginRight: '0.5rem',
					}}
					mode='multiple'
					placeholder='Select Outlets'
					onChange={handleChange}
					options={options}
				/>
				<Button onClick={getData} type='submit'>
					Submit
				</Button>
			</div>
			<div style={{ padding: '2rem 0' }} className=''>
				<div className='row flex-container'>
					<h2>{selected && summary && summary.length ? summary.name : null}</h2>
					<div>
						<div className='card box'>
							{loading ? (
								<Skeleton active></Skeleton>
							) : (
								<div>
									<Input
										prefix={<SearchOutlined />}
										style={{ width: 250 }}
										onChange={(e) => searchBarOnChange(e.target.value)}
										placeholder='Search'
										value={searchText}
										onPressEnter={onSearch}
										className='my-2'
									/>
									<Table dataSource={rowsData} scroll={{ x: 1500 }}>
										<Column title='Outlet' sorter={(a, b) => sorterFunction(a, b, 'name')} key='0' dataIndex='name' />
										<Column title='Date' sorter={(a, b) => sorterFunction(a, b, 'date')} key='1' dataIndex='date' />
										<ColumnGroup title='Washer'>
											<Column
												title='Coin'
												sorter={(a, b) => sorterFunction(a, b, 'washerCoin')}
												dataIndex='washerCoin'
												key='2'
											/>
											<Column
												title='Epay'
												sorter={(a, b) => sorterFunction(a, b, 'washerEpay')}
												dataIndex='washerEpay'
												key='3'
											/>
											<Column
												title='Manual'
												sorter={(a, b) => sorterFunction(a, b, 'washerManual')}
												dataIndex='washerManual'
												key='4'
											/>
											<Column
												title='Total'
												key='5'
												sorter={(a, b) => sorterFunction(a, b, 'washerTotal')}
												dataIndex='washerTotal'
											/>
										</ColumnGroup>
										<ColumnGroup title='Dryer'>
											<Column
												title='Coin'
												sorter={(a, b) => sorterFunction(a, b, 'dryerCoin')}
												dataIndex='dryerCoin'
												key='6'
											/>
											<Column
												title='Epay'
												sorter={(a, b) => sorterFunction(a, b, 'dryerEpay')}
												dataIndex='dryerEpay'
												key='7'
											/>
											<Column
												title='Manual'
												sorter={(a, b) => sorterFunction(a, b, 'dryerEpay')}
												dataIndex='dryerEpay'
												key='8'
											/>
											<Column
												title='Total'
												key='9'
												sorter={(a, b) => sorterFunction(a, b, 'dryerTotal')}
												dataIndex='dryerTotal'
											/>
										</ColumnGroup>
										<Column
											title='Total'
											key='10'
											sorter={(a, b) => sorterFunction(a, b, 'totalTotal')}
											dataIndex='totalTotal'
										/>
									</Table>
								</div>
							)}

							<div className='py-2'>
								<Button className='br-button' type='primary'>
									<CSVLink data={rowsData} filename={`sales_summary.csv`} target='_blank'>
										Download CSV
									</CSVLink>
								</Button>
								{/* <Button className="br-button" type="primary">
                  Excel
                </Button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SalesSummary;
