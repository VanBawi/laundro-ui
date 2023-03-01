import React, { useState, useEffect } from 'react';
import '../Sales Performance/salesperformance.css';
import './browsablereports.css';
import { Table, DatePicker, Button, Select, Skeleton, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { epayReport } from '../../../reducer/reportsReducer';
import { allOutlets } from '../../../reducer/outletReducer';
import { CSVLink } from 'react-csv';
import { fetchOperators } from '../../../reducer/userReducer';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import { epaymentHeaders, sorterFunction } from './tableHeaderHelper';
const { RangePicker } = DatePicker;
const { Column } = Table;

const EpayRecord = () => {
	const { epay } = useSelector((state) => state.reports);
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
			dispatch(epayReport(postObj));
			setLoading(true);
		}
	}

	useEffect(() => {
		if (epay) {
			setLoading(false);
			const array = [];
			epay.forEach((epay) => {
				const d = {
					...epay,
					time: epay.createdAt && moment(epay.createdAt).format('hh:mm:ss'),
				};
				array.push(d);
			});

			setInitialData(array);
			setRowsData(array);
		}
	}, [epay]);

	const getDates = (value, dateString) => {
		setDate(dateString);
	};

	const handleChange = (value) => {
		setSelected(value);
	};

	const methodChange = (value) => {
		setMethod(value);
	};

	const items = [
		{
			label: 'TnG',
			value: 'TNG',
		},
		{
			label: 'Boost',
			value: 'BOOST',
		},
		{
			label: 'All',
			value: '',
		},
	];

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};

	const onSearch = (e) => {
		if (!searchText) return;
	};

	function filterByValue(array, value) {
		return array.filter((data) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
	}

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

	// console.log('-rowsData', rowsData);
	return (
		<div>
			Epayment Transaction Record
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
					mode='multiple'
					allowClear
					style={{
						width: '10rem',
						marginRight: '0.5rem',
					}}
					placeholder='Select Outlets'
					onChange={handleChange}
					options={options}
				/>
				<Button onClick={getData} type='submit'>
					Submit
				</Button>
			</div>
			<div style={{ padding: '2rem 0' }}>
				<div className='row flex-container'>
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
										<Column
											title='Outlet Name'
											sorter={(a, b) => sorterFunction(a, b, 'outletName')}
											dataIndex='outletName'
											key='outlet'
										/>
										<Column
											title='Name'
											sorter={(a, b) => sorterFunction(a, b, 'machineName')}
											dataIndex='machineName'
											key='machineName'
										/>
										<Column
											title='Method'
											sorter={(a, b) => sorterFunction(a, b, 'method')}
											dataIndex='method'
											key='method'
										/>
										<Column
											title='Amount'
											sorter={(a, b) => sorterFunction(a, b, 'amount')}
											dataIndex='amount'
											key='amount'
										/>
										<Column
											title='Status'
											sorter={(a, b) => sorterFunction(a, b, 'status')}
											dataIndex='status'
											key='status'
										/>
										<Column title='Date' key='date' sorter={(a, b) => sorterFunction(a, b, 'date')} dataIndex='date' />
										<Column title='Time' key='time' sorter={(a, b) => sorterFunction(a, b, 'time')} dataIndex='time' />
										<Column
											title='Transaction ID'
											sorter={(a, b) => sorterFunction(a, b, 'transaction_id')}
											dataIndex='transaction_id'
											key='5'
										/>
									</Table>
								</div>
							)}

							<div className='py-2'>
								<Button type='primary'>
									<CSVLink data={rowsData} headers={epaymentHeaders} filename={`epay-record.csv`} target='_blank'>
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

export default EpayRecord;
