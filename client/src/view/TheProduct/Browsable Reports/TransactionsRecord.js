import React, { useEffect, useState } from 'react';
import '../Sales Performance/salesperformance.css';
import './browsablereports.css';
import { Table, DatePicker, Button, Select, Skeleton, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { transReport } from '../../../reducer/reportsReducer';
import { allOutlets } from '../../../reducer/outletReducer';
import { CSVLink } from 'react-csv';
import { fetchOperators } from '../../../reducer/userReducer';
import { SearchOutlined } from '@ant-design/icons';
import { browsableReportHeaders } from './tableHeaderHelper';
const { RangePicker } = DatePicker;

const TransactionsRecord = () => {
	const { report } = useSelector((state) => state.reports);
	const { outlets } = useSelector((state) => state.outlets);
	const dispatch = useDispatch();
	const [date, setDate] = useState([]);

	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState([]);
	const [method, setMethod] = useState();
	const [loading, setLoading] = useState(false);

	const { distributor, operator, operators } = useSelector((state) => state.user);

	const [searchText, setSearchText] = useState('');
	const [initialData, setInitialData] = useState([]);

	const [columns, setColumns] = useState([]);
	const [rowsData, setRowsData] = useState([]);

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	useEffect(() => {
		if (browsableReportHeaders) {
			const data = [...browsableReportHeaders].map((each) => {
				return {
					...each,
					sorter: (a, b) => {
						if (/^-?\d*\.?\d+$/.test(a[each.key])) {
							return a[each.key] - b[each.key];
						} else if (a[each.key] === 'date') {
							return new Date(a[each.key]) - new Date(b[each.key]);
						} else {
							return a[each.key] ? a[each.key].localeCompare(b[each.key]) : a[each.key];
						}
					},
				};
			});
			setColumns(data);
		}
	}, [browsableReportHeaders]);

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
			dispatch(transReport(postObj));
			setLoading(true);
		}
	}

	useEffect(() => {
		if (report) {
			setLoading(false);
			setInitialData(report);
			setRowsData(report);
		}
	}, [report]);

	const handleChange = (value, val) => {
		setSelected(value);
		// console.log(value, val);
	};

	const methodChange = (value) => {
		setMethod(value);
	};

	const getDates = (value, dateString) => {
		setDate(dateString);
	};
	// console.log('selected', selected);

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
			value: 'all',
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

	return (
		<div>
			Transaction Record
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
			<div style={{ padding: '2rem 0' }} className=''>
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
									<Table dataSource={rowsData} scroll={{ x: 1500 }} columns={columns}></Table>
								</div>
							)}
							<div className='d-flex py-2'>
								<Button className='br-button' type='primary'>
									<CSVLink data={rowsData} filename={`transactions-record.csv`} target='_blank'>
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

export default TransactionsRecord;
