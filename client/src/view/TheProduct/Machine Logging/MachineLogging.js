import React, { useState, useEffect } from 'react';
import { Table, Button, message, Input, Breadcrumb, Skeleton, List, Menu, Select } from 'antd';
import AddRecordModal from './AddRecordModal';
import { useDispatch, useSelector } from 'react-redux';
import { machineLogs } from '../../../reducer/machineLogReducer';
import { UnorderedListOutlined, FormOutlined } from '@ant-design/icons';
import ImagesGalleryModal from './ImagesGalleryModal';
import UpdateRecordModal from './UpdateRecordModal';
import { fetchOperators } from '../../../reducer/userReducer';
import { columns, columns2, columns3 } from './helperTableData';

const MachineLogging = (props) => {
	const dispatch = useDispatch();
	const [tabIndex, setTabIndex] = useState(1);
	const [value, setValue] = useState('');

	const { machineLoggings, loading, error } = useSelector((state) => state.machineLogs);

	const [table2, setTable2] = useState([]);
	const [table3, setTable3] = useState([]);
	const [imgs, setImgs] = useState([]);
	const [issueLists, setIssuesLists] = useState([]);

	const [loggings, setLoggings] = useState(machineLoggings);
	const [currentRecord, setCurrentRecord] = useState('');
	const [outletName, setOutletName] = useState('');
	const [allLogs, setAllLogs] = useState('');
	const [oldImages, setImages] = useState('');

	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	const { distributor, operator, operators } = useSelector((state) => state.user);

	useEffect(() => {
		if (operator) {
			dispatch(machineLogs());
		}
	}, [dispatch, operator]);

	useEffect(() => {
		if (distributor && operatorId) {
			dispatch(machineLogs(operatorId));
		}
	}, [dispatch, distributor, operatorId]);

	// console.log('loggings loggings loggings', loggings);
	useEffect(() => {
		if (error) {
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

	const getTable3Data = (data) => {
		// console.log('data', data);
		setAllLogs(data);
		const mapData =
			data.logs &&
			data.logs.map((each, idx) => {
				return {
					key: idx,
					title: each.title,
					machineType: data.machine_type,
					description: each.description,
					name: data.name,
					date: each.date,
					time: each.time,
					displayname: data.displayname || '',
					images: (
						<div
							style={{ cursor: 'pointer', color: 'blue' }}
							onClick={() => {
								showModalGallery();
								setImgs(each.imgs);
							}}
						>
							{each.imgs && each.imgs.length
								? each.imgs.slice(0, 1).map((image, index) => {
										return (
											<div key={index} className='my-1 border'>
												<img src={image} alt='' style={{ objectFit: 'contain', width: '100px', height: '100px' }} />
											</div>
										);
								  })
								: ''}
							{each.imgs && each.imgs.length > 1 ? 'more...' : ''}
						</div>
					),
					update: (
						<div
							style={{ color: 'blue', cursor: 'pointer' }}
							onClick={() => {
								showUpdateModal();
								setCurrentRecord(each);
								setImages(each.imgs);
							}}
						>
							<FormOutlined />
						</div>
					),
				};
			});
		setTable3(mapData);
	};

	const getTable2Data = (data) => {
		const mapData = data.map((each, idx) => {
			return {
				key: idx,
				machine: each.name,
				issue: each.issue,
				machineType: each.machine_type,
				displayname: each.displayname || '',
				maintenance: each.maintenance,
				details: (
					<div
						style={{ color: 'blue', cursor: 'pointer' }}
						onClick={() => {
							getTable3Data(each);
							setTabIndex(3);
						}}
					>
						<UnorderedListOutlined />
					</div>
				),
			};
		});
		setTable2(mapData);
	};

	useEffect(() => {
		if (machineLoggings) {
			setLoggings(machineLoggings);
		}
	}, [machineLoggings]);

	useEffect(() => {
		if (loggings) {
			const tab1 = loggings.map((each, idx) => {
				return {
					key: idx,
					outlet: each.fullname,
					machines: each.machines,
					pendingIssues: each.issue,
					records: each.maintenance,
					details: (
						<div
							style={{ color: 'blue' }}
							onClick={() => {
								getTable2Data(each.details);
								setTabIndex(2);
								setOutletName(each.fullname);
							}}
						>
							<UnorderedListOutlined />
						</div>
					),
				};
			});
			setIssuesLists(tab1);
		}
	}, [loggings]);

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

	const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
	const showModalGallery = () => {
		setIsModalOpenGallery(true);
	};
	const handleOkGallery = () => {
		setIsModalOpenGallery(false);
	};
	const handleCancelGallery = () => {
		setIsModalOpenGallery(false);
	};

	// console.log('machineLoggings', machineLoggings)
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const showUpdateModal = () => {
		setUpdateModalOpen(true);
	};
	const handleUpdateOk = () => {
		setUpdateModalOpen(false);
	};
	const handleUpdateCancel = () => {
		setUpdateModalOpen(false);
	};

	// console.log('machineLoggings', machineLoggings);
	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
		setTabIndex(1);
	};

	return (
		<div>
			<AddRecordModal
				operatorId={operatorId}
				machineLoggings={machineLoggings}
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
				handleOk={handleOk}
				handleCancel={handleCancel}
			/>

			<ImagesGalleryModal
				imgs={imgs}
				setIsModalOpen={setIsModalOpenGallery}
				isModalOpen={isModalOpenGallery}
				handleOk={handleOkGallery}
				handleCancel={handleCancelGallery}
			/>

			<UpdateRecordModal
				operatorId={operatorId}
				oldImages={oldImages}
				allLogs={allLogs}
				getTable3Data={getTable3Data}
				outletName={outletName}
				currentRecord={currentRecord}
				setIsModalOpen={setUpdateModalOpen}
				isModalOpen={updateModalOpen}
				handleOk={handleUpdateOk}
				handleCancel={handleUpdateCancel}
			/>

			<div className='d-flex justify-content-between'>
				<div>
					<Button type='primary' onClick={() => showModal()}>
						Add Record
					</Button>
				</div>
			</div>

			<Breadcrumb className='mt-4'>
				<Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={() => setTabIndex(1)}>
					Outlet Records
				</Breadcrumb.Item>
				{tabIndex > 1 ? (
					<Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={() => setTabIndex(2)}>
						Outlet Details
					</Breadcrumb.Item>
				) : null}

				{tabIndex === 3 ? <Breadcrumb.Item>Records Details</Breadcrumb.Item> : null}
			</Breadcrumb>

			<div className='d-flex' style={{ marginTop: '1rem' }}>
				{distributor ? (
					<Select
						style={{ width: '12rem', marginRight: '1rem' }}
						value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
						onChange={handleChangeOperatorId}
						options={operatorsOptions}
					/>
				) : null}

				<Input
					style={{ width: '200px' }}
					placeholder='Search Outlet'
					value={value}
					onChange={(e) => {
						const currValue = e.target.value;
						setValue(currValue);
						const filteredData = machineLoggings.filter((entry) => entry.name.includes(currValue));
						setLoggings(filteredData);
					}}
				/>
			</div>

			{loading ? (
				<Skeleton className='mt-3' loading={loading} active>
					<List.Item.Meta />
				</Skeleton>
			) : (
				<>
					{tabIndex === 1 ? (
						<div className='mt-3'>
							<Table dataSource={issueLists} columns={columns} bordered scroll={{ x: 500 }} />
						</div>
					) : null}

					{tabIndex === 2 ? (
						<div className='mt-4'>
							<Table dataSource={table2} columns={columns2} bordered scroll={{ x: 500 }} />
						</div>
					) : null}

					{tabIndex === 3 ? (
						<div className='mt-4'>
							<Table dataSource={table3} columns={columns3} bordered scroll={{ x: 500 }} />
						</div>
					) : null}
				</>
			)}
		</div>
	);
};

export default MachineLogging;
