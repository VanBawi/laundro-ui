import { Modal, TimePicker, DatePicker, Select, Input, Upload, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateMachineLog } from '../../../reducer/machineLogReducer';
const { TextArea } = Input;

const AddRecordModal = ({
	oldImages,
	allLogs,
	getTable3Data,
	outletName,
	currentRecord,
	isModalOpen,
	setIsModalOpen,
	handleCancel,
	operatorId,
}) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [recordId, setRecordId] = useState('');
	const [time, setTime] = useState('');
	const [date, setDate] = useState('');

	const { machineLog, error } = useSelector((state) => state.machineLogs);

	useEffect(() => {
		if (error) {
			message.error(error.en);
			setFileList([]);
		}
	}, [error]);

	useEffect(() => {
		if (!isModalOpen) {
			return;
		}
	}, []);

	useEffect(() => {
		if (machineLog) {
			setIsModalOpen(false);
			message.success('Successfully updated.');
			setFileList([]);
			let updateArr = { ...allLogs };
			updateArr.logs = allLogs.logs;

			const mapD =
				updateArr.logs &&
				updateArr.logs.length &&
				updateArr.logs.map((e) => {
					if (e.id === machineLog.id) {
						return machineLog;
					} else {
						return e;
					}
				});
			if (mapD) {
				updateArr.logs = mapD;
			}
			// console.log('updateArr', updateArr)
			getTable3Data(updateArr);
		}
	}, [machineLog]);

	// console.log('oldImages', oldImages)

	useEffect(() => {
		if (currentRecord) {
			setRecordId(currentRecord.id);
			setTime(currentRecord.time);
			setDate(currentRecord.date);
			const date = moment(currentRecord.date, 'YYYY-MM-DD');
			const time = currentRecord.time.split(':');

			form.setFieldsValue({
				type: currentRecord.type,
				title: currentRecord.title,
				description: currentRecord.description,
				time: moment(`${time[0]}:${time[1]}`, 'HH:mm'),
				date: date,
			});
		}
	}, [currentRecord]);

	// console.log('currentRecord', currentRecord)

	// console.log('outlets', outlets)
	const [fileList, setFileList] = useState([]);
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

	const onChangeDate = (time, timeString) => {
		// console.log(time, timeString);
		setDate(timeString);
	};

	const onChangeTime = (time, timeString) => {
		// console.log(time, timeString);
		setTime(timeString);
	};

	const onFinish = (values) => {
		let data = { ...values };
		data.images = fileList.length ? fileList.map((e) => e.originFileObj) : null;

		// console.log("Success:", data);
		const { type, title, description, images } = data;
		const formData = new FormData();

		if (operatorId) {
			formData.append('operatorId', operatorId);
		}

		formData.append('id', recordId);
		formData.append('type', type);
		if (date) {
			formData.append('date', date);
		}
		if (time) {
			formData.append('time', time);
		}

		formData.append('title', title);
		formData.append('description', description);
		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append('images', images[i]);
			}
		}
		dispatch(updateMachineLog(formData));
	};

	// console.log('images', oldImages)

	return (
		<>
			<Modal
				closable={true}
				title={`${outletName || ''} Update Record`}
				open={isModalOpen}
				onCancel={() => {
					handleCancel();
					setFileList([]);
				}}
				okText=''
				cancelText=''
				footer={null}
				width={700}
			>
				<div>
					<Form
						form={form}
						name='normal_login'
						className='p-4'
						onFinish={onFinish}
						layout='vertical'
						initialValues={{}}
					>
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
									<Select style={{ width: '155px' }} options={issueTypes} />
								</Form.Item>
							</div>
							<div className='py-1'>
								<Form.Item
									name='date'
									rules={[
										{
											required: true,
											message: 'Please select date!',
										},
									]}
								>
									<DatePicker format={'YYYY-MM-DD'} onChange={onChangeDate} style={{ width: '155px' }} />
								</Form.Item>
							</div>
							<div className='py-1'>
								<Form.Item
									name='time'
									rules={[
										{
											required: true,
											message: 'Please select time!',
										},
									]}
								>
									<TimePicker onChange={onChangeTime} style={{ width: '155px' }} format={'HH:mm'} />
								</Form.Item>
							</div>
						</div>
						<div className='py-2'>
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

						<div>
							<Form.Item name='description'>
								<TextArea rows={5} placeholder='Max Length is 1000' maxLength={1000} />
							</Form.Item>
						</div>

						<div>
							<div>Uploaded Images</div>
							<div className='d-flex flex-wrap'>
								{oldImages
									? oldImages.map((image) => {
											return (
												<div className='my-2 me-2 border'>
													{' '}
													<img
														src={image}
														alt=''
														style={{ objectFit: 'contain', width: '70px', height: '70px' }}
													/>{' '}
												</div>
											);
									  })
									: ''}
							</div>
						</div>
						<div>
							<Upload listType='picture-card' fileList={fileList} onChange={onChange} onPreview={onPreview}>
								{fileList.length < 100 && '+ Upload'}
							</Upload>
						</div>

						<Form.Item className='mt-4 d-flex justify-content-end'>
							<Button onClick={() => setIsModalOpen(false)} size='large' type='default' className='mx-2'>
								Cancel
							</Button>
							<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
								Save
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
};
export default AddRecordModal;
