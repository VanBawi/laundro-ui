import { Modal, TimePicker, DatePicker, Select, Checkbox, Input, Upload, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import ImgCrop from 'antd-img-crop';
import { useDispatch, useSelector } from 'react-redux';
import { addMachineLog, machineLogs } from '../../../reducer/machineLogReducer';
import { allOutlets } from '../../../reducer/outletReducer';

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const AddRecordModal = ({ machineLoggings, isModalOpen, setIsModalOpen, handleCancel, operatorId }) => {
	const dispatch = useDispatch();

	const [outletsData, setOutlets] = useState([]);
	const [machineIds, setMachineIds] = useState([]);
	const [machines, setMachines] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [loggings, setLoggings] = useState('');
	const [form] = Form.useForm();
	const [allKgsData, setAllKgsData] = useState([]);

	const { outlets } = useSelector((state) => state.outlets);
	const { machineLog, error } = useSelector((state) => state.machineLogs);
	const dateNow = new Date();

	useEffect(() => {
		if (operatorId) {
			dispatch(allOutlets(operatorId));
		} else {
			dispatch(allOutlets());
		}
	}, [dispatch, operatorId, isModalOpen]);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			setFileList([]);
			setAllKgsData([]);
			setMachineIds([]);
		}
	}, [isModalOpen]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (machineLoggings) {
			setLoggings(machineLoggings);
		}
	}, [machineLoggings]);

	useEffect(() => {
		if (machineLog) {
			setIsModalOpen(false);
			form.resetFields();
			setFileList([]);
			if (operatorId) {
				dispatch(machineLogs(operatorId));
			} else {
				dispatch(machineLogs());
			}
		}
	}, [machineLog]);

	useEffect(() => {
		if (outlets) {
			const opts = outlets.map((outlet) => {
				return {
					value: outlet.id,
					label: outlet.fullname,
				};
			});
			setOutlets(opts);
		}
	}, [outlets]);

	// console.log('outlets', outlets)

	const selectOutlets = (outletId) => {
		// console.log('loggings', loggings)
		const mapData = loggings ? loggings.find((ea) => ea.id === outletId) : null;
		// console.log('mapData', mapData, outletId)
		if (mapData) {
			// console.log('mapData', mapData)
			const resData = mapData.details.map((each, idx) => {
				return {
					label: each.name,
					value: each.machineId,
					weight: each.machine_weight,
				};
			});

			const allKgs = [];
			mapData.details.forEach((each, idx) => {
				if (each.machine_weight && !allKgs.includes(each.machine_weight)) {
					allKgs.push(each.machine_weight);
				}
			});
			setAllKgsData(allKgs);
			setMachineIds(resData);
		}
	};

	// console.log('machineIds', machineIds)
	//
	const defaultCheckedList = [];
	const defaultCheckedList2 = [];
	// const machineIds = []

	const [checkedList, setCheckedList] = useState(defaultCheckedList);
	const [checkedList2, setCheckedList2] = useState(defaultCheckedList2);
	const [indeterminate, setIndeterminate] = useState(true);
	const [checkAll, setCheckAll] = useState(false);

	const onChangeCheckbox = (selectedKgs) => {
		setCheckedList(selectedKgs);
		// console.log('selectedKgs', selectedKgs);
		const allFilteredData = [];
		if (selectedKgs.length) {
			selectedKgs.forEach((e) => {
				const filteredKgs = machineIds.filter((each) => each.weight === e);

				if (filteredKgs.length) {
					filteredKgs.forEach((eachD) => allFilteredData.push(eachD.value));
				}
			});
			setCheckedList2(allFilteredData);
			setMachines(allFilteredData);
		}
	};

	const onChangeCheckbox2 = (list) => {
		// console.log('list', list)
		setCheckedList2(list);
		setIndeterminate(!!list.length && list.length < machineIds.length);
		setCheckAll(list.length === machineIds.length);
		setMachines(list);
	};

	const onCheckAllChange2 = (e) => {
		// console.log('e', machineIds)
		const extractToArr = machineIds && machineIds.map((e) => e.value);
		setCheckedList2(e.target.checked ? extractToArr : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
		setMachines(e.target.checked ? extractToArr : []);
	};
	// console.log('machines', machines)

	const onChange = ({ fileList: newFileList }) => {
		// console.log('newFileList, newFileList', newFileList)
		const mapData = newFileList.map((file) => {
			return {
				...file,
				status: 'done',
			};
		});
		setFileList(mapData);
	};
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		// const imgWindow = window.open(src);
		// imgWindow?.document.write(image.outerHTML);
	};

	const issueTypes = [
		{
			value: 'issue',
			label: 'Issue',
		},
		{
			value: 'maintenance',
			label: 'Maintenance',
		},
	];

	const onChangeTime = (time, timeString) => {
		// console.log(time, timeString);
	};

	const onFinish = (values) => {
		let data = { ...values };
		data.date = data.date || moment().format('YYYY-MM-DD');
		data.time = data.time || `${dateNow.getHours()}:${dateNow.getMinutes()}`;
		data.machines = machines;
		data.images = fileList.length ? fileList.map((e) => e.originFileObj) : null;

		// console.log("Success:", data);
		const { type, outlet, time, title, description, date, images } = data;
		const formData = new FormData();

		if (operatorId) {
			formData.append('operatorId', operatorId);
		}

		formData.append('type', type);
		formData.append('date', date);
		formData.append('time', time);
		formData.append('outletId', outlet);
		formData.append('title', title);
		formData.append('description', description);

		for (let i = 0; i < machines.length; i++) {
			formData.append('machines', machines[i]);
		}
		if (!machines.length) {
			return message.error('Please select machines');
		}

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append('images', images[i]);
			}
		} else {
			formData.append('images', []);
		}

		// console.log('machines', machines)
		dispatch(addMachineLog(formData));
	};

	// console.log('machineLoggings', machineLoggings)

	return (
		<>
			<Modal
				closable={true}
				title='Add Record'
				open={isModalOpen}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
				width={700}
			>
				<div>
					<Form name='normal_login' onFinish={onFinish} layout='vertical' form={form}>
						<div className='d-flex flex-wrap justify-content-between'>
							<div className='py-1'>
								<Form.Item
									name='type'
									rules={[
										{
											required: true,
											message: 'Please select the record type!',
										},
									]}
								>
									<Select defaultValue='Select record type' style={{ width: '155px' }} options={issueTypes} />
								</Form.Item>
							</div>
							<div className='py-1'>
								<Form.Item name='date'>
									<DatePicker
										defaultValue={moment()}
										format={'YYYY-MM-DD'}
										onChange={onChangeTime}
										style={{ width: '155px' }}
									/>
								</Form.Item>
							</div>
							<div className='py-1'>
								<Form.Item name='time'>
									<TimePicker
										onChange={onChangeTime}
										style={{ width: '155px' }}
										format={'HH:mm'}
										defaultValue={moment(`${dateNow.getHours()}:${dateNow.getMinutes()}`, 'HH:mm')}
									/>
								</Form.Item>
							</div>
							<div className='py-1'>
								<Form.Item
									name='outlet'
									rules={[
										{
											required: true,
											message: 'Please select the outlet',
										},
									]}
								>
									<Select
										defaultValue='Select Outlets'
										style={{ width: '155px' }}
										onChange={(value) => selectOutlets(value)}
										options={outletsData}
									/>
								</Form.Item>
							</div>
						</div>
						<div>
							<Form.Item
								name='title'
								rules={[
									{
										required: true,
										message: 'Please type the title!',
									},
								]}
							>
								<Input placeholder='Add Title' />
							</Form.Item>
						</div>
						<div className='d-flex justify-content-between flex-wrap'>
							<div style={{ minWidth: '150px' }} className='mt-2'>
								<label>Group</label>
								<div className='border me-2 p-2'>
									<CheckboxGroup options={allKgsData} value={checkedList} onChange={onChangeCheckbox} />
								</div>
							</div>

							<div className='mt-2'>
								<label>Selected Machines</label>
								<div className='border p-2'>
									<Form.Item name='machines'>
										<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange2} checked={checkAll}>
											Check all
										</Checkbox>
										<div></div>
										<div>
											<CheckboxGroup
												style={{ textTransform: 'uppercase', columnCount: 2 }}
												options={machineIds}
												value={checkedList2}
												onChange={onChangeCheckbox2}
											/>
										</div>
									</Form.Item>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<Form.Item name='description'>
								<TextArea rows={5} placeholder='Max Length is 1000' maxLength={1000} />
							</Form.Item>
						</div>
						<div className='mt-2'>
							<Upload listType='picture-card' fileList={fileList} onChange={onChange} onPreview={onPreview}>
								{fileList.length < 100 && '+ Upload'}
							</Upload>
						</div>

						<Form.Item className='mt-4 d-flex justify-content-end'>
							<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
};
export default AddRecordModal;
