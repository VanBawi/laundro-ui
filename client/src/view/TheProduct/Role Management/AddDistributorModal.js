import { Modal, Select, Input, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDistributor, getClients } from '../../../reducer/adminReducer';

const AddDistributorModal = ({ isModalOpen, setIsModalOpen, handleCancel, clientsOptions, fetchClients }) => {
	const dispatch = useDispatch();

	const [form] = Form.useForm();
	const [submit, setSubmit] = useState(false);

	const { distributor, error } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen, form]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (distributor && submit) {
			setIsModalOpen(false);
			form.resetFields();
			message.success('Distributor created successfully!');
			fetchClients();
		}
	}, [distributor, submit]);

	const onFinish = (values) => {
		// console.log('values', values);
		setSubmit(true);
		dispatch(addDistributor(values));
	};

	return (
		<>
			<Modal
				closable={true}
				title='Add New Distributor'
				open={isModalOpen}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
			>
				<Form name='add-new-dis' onFinish={onFinish} layout='vertical' form={form}>
					<div className='card p-3'>
						<Form.Item
							name='name'
							label='Name'
							rules={[
								{
									required: true,
									message: 'Please input the name!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name='description' label='Description'>
							<Input />
						</Form.Item>

						<Form.Item
							name='clientId'
							label='Client ID'
							rules={[
								{
									required: true,
									message: 'Please select the client!',
								},
							]}
						>
							<Select placeholder='Select client' options={clientsOptions} />
						</Form.Item>
					</div>

					<Form.Item className='mt-4 d-flex justify-content-end'>
						<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddDistributorModal;
