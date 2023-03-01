import { Modal, Select, Input, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, getRoleList, addRole } from '../../../reducer/roleReducer';

const AddRoleModal = ({ isModalOpen, setIsModalOpen, handleCancel }) => {
	const dispatch = useDispatch();

	const [options, setOptions] = useState([]);
	const [submit, setSubmit] = useState(false);

	const [form] = Form.useForm();

	const { role, permissions, error } = useSelector((state) => state.roleReducer);

	useEffect(() => {
		dispatch(getPermissions());
	}, [dispatch]);

	useEffect(() => {
		if (permissions) {
			const d2 = [];
			permissions.forEach((e) => {
				const d = {
					value: e.id,
					label: e.title + ' (' + e.type + ')',
				};
				d2.push(d);
			});
			setOptions(d2);
		}
	}, [permissions]);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (role && submit) {
			setIsModalOpen(false);
			form.resetFields();

			message.success('Role created successfully!');
			dispatch(getRoleList());
		}
	}, [role, submit]);

	const onFinish = (values) => {
		setSubmit(true);
		// console.log('values', values);
		dispatch(addRole(values));
	};

	// console.log('permissions', permissions);

	return (
		<>
			<Modal
				closable={true}
				title='Add New Role'
				open={isModalOpen}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
			>
				<Form name='add-new-role' onFinish={onFinish} layout='vertical' form={form}>
					<div className='card p-3'>
						<Form.Item
							name='title'
							label='Title'
							rules={[
								{
									required: true,
									message: 'Please input the title!',
								},
							]}
						>
							<Input placeholder='Add title' />
						</Form.Item>
						<Form.Item name='description' label='Description'>
							<Input placeholder='Optional' />
						</Form.Item>

						<Form.Item
							name='permissions'
							label='Permissions'
							rules={[
								{
									required: true,
									message: 'Please select permission!',
								},
							]}
						>
							<Select mode='multiple' allowClear placeholder='Select Permissions' options={options} />
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
export default AddRoleModal;
