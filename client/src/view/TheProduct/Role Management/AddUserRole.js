import { Modal, Select, Input, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getClients } from '../../../reducer/adminReducer';
import { getRoleList } from '../../../reducer/roleReducer';

const AddUserRole = ({ isModalOpen, setIsModalOpen, handleCancel }) => {
	const dispatch = useDispatch();

	const [accountLevel, setAccountLevel] = useState('');
	const [form] = Form.useForm();
	const [rolesOptions, setRolesOptions] = useState([]);
	const [clientsOptions, setClientsOptions] = useState([]);
	const [distributorsOptions, setDistributorsOptions] = useState([]);
	const [submit, setSubmit] = useState(false);

	const { roleLists, error } = useSelector((state) => state.roleReducer);
	const { clients, user } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		dispatch(getRoleList());
		dispatch(getClients());
	}, [dispatch]);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen, form]);

	useEffect(() => {
		if (roleLists) {
			const d2 = [];
			roleLists.forEach((e) => {
				const d = {
					value: e.id,
					label: e.title,
				};
				d2.push(d);
			});
			setRolesOptions(d2);
		}
	}, [roleLists]);

	useEffect(() => {
		if (clients) {
			const distributes = [];
			const d2 = [];
			clients.forEach((e) => {
				e.distributors.forEach((each) => distributes.push(each));

				const d = {
					value: e.id,
					label: e.name,
				};
				d2.push(d);
			});
			const allDistributors = [];
			if (distributes.length) {
				distributes.forEach((e) => {
					const data = {
						value: e.id,
						label: e.name,
					};
					allDistributors.push(data);
				});
			}
			setDistributorsOptions(allDistributors);
			setClientsOptions(d2);
		}
	}, [clients]);
	// console.log('clients', clients);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (user && submit) {
			handleCancel();
			form.resetFields();

			message.success('User created successfully!');
		}
	}, [user, submit]);

	const onFinish = (values) => {
		// console.log('values', values);
		setSubmit(true);
		dispatch(addUser(values));
	};
	// console.log('form', form.getFieldValue('level'))
	// console.log('roleLists', roleLists);

	return (
		<>
			<Modal
				closable={true}
				title='Add New User'
				open={isModalOpen}
				// onOk={handleOk}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
			>
				<Form name='add-new-role' className='login-form card p-3' onFinish={onFinish} layout='vertical' form={form}>
					<div className='p-2'>
						<div className='py-2'>Basis Information</div>
						<Form.Item
							name='username'
							label='Username'
							rules={[
								{
									required: true,
									message: 'Please input your Username!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{ marginTop: '-0.5rem' }}
							name='email'
							label='Email'
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{ marginTop: '-0.5rem' }}
							name='password'
							label='Password'
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
								{
									validator: (_, value) => {
										let regNumber = /^.{6,}$/;
										if (!regNumber.test(value)) {
											return Promise.reject(new Error('Password must be at least 6 characters long'));
										} else {
											return Promise.resolve();
										}
									},
								},
								//
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
					</div>

					<div className='p-2'>
						<div className='py-2'>Account Type</div>
						<Form.Item
							name='type'
							rules={[
								{
									required: true,
									message: 'Please select level!',
								},
							]}
						>
							<Select
								placeholder='Select account type'
								onChange={(e) => setAccountLevel(e)}
								options={[
									{
										value: 'client',
										label: 'Client',
									},
									{
										value: 'distributor',
										label: 'Distributor',
									},
								]}
							/>
						</Form.Item>

						{accountLevel === 'client' ? (
							<Form.Item
								name='clientId'
								rules={[
									{
										required: true,
										message: 'Please select brand!',
									},
								]}
							>
								<Select placeholder='Select client' options={clientsOptions} />
							</Form.Item>
						) : null}

						{accountLevel === 'distributor' ? (
							<Form.Item
								name='distributorId'
								rules={[
									{
										required: true,
										message: 'Please select brand!',
									},
								]}
							>
								<Select placeholder='Select Operator' options={distributorsOptions} />
							</Form.Item>
						) : null}
					</div>

					<div className='p-2'>
						<div className='py-2'>The role of the account</div>
						<Form.Item
							name='roleId'
							rules={[
								{
									required: true,
									message: 'Please select role!',
								},
							]}
						>
							<Select placeholder='Select role' options={rolesOptions} />
						</Form.Item>
					</div>
					<Form.Item className='d-flex justify-content-end'>
						<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddUserRole;
