import { Modal, Input, Button, Form, message, Divider, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, addClient } from '../../../reducer/adminReducer';
import { statesArr } from '../../../utilities/helperData';

const AddClientModal = ({ isModalOpen, setIsModalOpen, handleCancel }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const [submit, setSubmit] = useState(false);
	const [statesOptions] = useState(statesArr);
	const { client, error } = useSelector((state) => state.adminReducer);

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
		if (client && submit) {
			setIsModalOpen(false);
			form.resetFields();

			message.success('Client created successfully!');
			dispatch(getClients());
		}
	}, [client, submit]);

	const onFinish = (values) => {
		// console.log('values', values);

		setSubmit(true);
		dispatch(addClient(values));
	};
	// console.log('client', client);

	return (
		<>
			<Modal
				closable={true}
				title='Add New Client'
				open={isModalOpen}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
			>
				<Form layout='vertical' form={form} onFinish={onFinish}>
					<Form.Item
						name='name'
						label='Name'
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}
					>
						<Input placeholder='Name *' />
					</Form.Item>

					<Form.Item
						label='Loyalty domain'
						name='loyalty_domain'
						rules={[
							{
								required: true,
								message: 'Please input your loyalty_domain!',
							},
						]}
						style={{ marginTop: '-1rem' }}
					>
						<Input placeholder='Loyalty domain *' />
					</Form.Item>

					<div className='text-center mb-3'>
						<Divider>
							<small className='fw-light'>(Optional) </small>
						</Divider>
					</div>

					<Form.Item label='Description' name='description'>
						<Input placeholder='Description' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='Region' name='region'>
						<Input placeholder='Region' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='City' name='city'>
						<Input placeholder='City' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='State' name='state'>
						<Select options={statesOptions} placeholder='State' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='Postcode' name='postcode'>
						<Input placeholder='Postcode' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='Address' name='address'>
						<Input placeholder='Address' />
					</Form.Item>

					<Form.Item style={{ marginTop: '-1rem' }} label='Office Number' name='office_number'>
						<Input placeholder='Office number' />
					</Form.Item>

					<Form.Item shouldUpdate>
						{() => (
							<Button
								type='primary'
								htmlType='submit'
								disabled={
									!form.isFieldTouched('name') ||
									!form.isFieldTouched('loyalty_domain') ||
									!!form.getFieldsError().filter(({ errors }) => errors.length).length
								}
							>
								Submit
							</Button>
						)}
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddClientModal;
