import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createRM } from '../../../reducer/userReducer';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';

const RmForm = ({ setRmForm, data, setData, setCurrent, operatorId }) => {
	const dispatch = useDispatch();
	const [submit, setSubmit] = useState(false);
	const [tempData, setTempData] = useState({});
	const { rm } = useSelector((state) => state.user);

	const onFinish = (values) => {
		let data = { ...values };
		if (operatorId) {
			data.operatorId = operatorId;
		}

		dispatch(createRM(data));
		setSubmit(true);
		setTempData(data);
		// console.log(tempData);
	};

	useEffect(() => {
		if (rm && submit) {
			message.success('RM Config created successfully!');
			setRmForm();
		}
	}, [rm, submit]);

	useEffect(() => {
		// console.log("hello");
		if (submit) {
			setData({
				...data,
				rmData: tempData,
			});
			// console.log(data);
			setCurrent(1);
		}
	}, [tempData]);

	return (
		<div className='card'>
			<Form onFinish={onFinish} name='normal_login' className='p-4' layout='vertical'>
				<div className='d-flex justify-content-between'>
					<Form.Item
						style={{
							display: 'inline-block',
							width: '20%',
							margin: '0 8px',
						}}
						name='description'
						label='Label'
						rules={[
							{
								required: true,
								message: 'Please input your label!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{
							display: 'inline-block',
							width: '20%',
							margin: '0 8px',
						}}
						name='clientsecret'
						label='Client Secret'
						rules={[
							{
								required: true,
								message: 'Please input your Client Secret!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{
							display: 'inline-block',
							width: '20%',
							margin: '0 8px',
						}}
						name='clientid'
						label='Client ID'
						rules={[
							{
								required: true,
								message: 'Please input your Client ID!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
				</div>
				<Form.Item
					style={{
						// marginTop: "2.5rem",
						display: 'inline-block',
						width: '100%',
						margin: '2.5rem 8px 0 8px',
					}}
					name='privkey'
					label='RM Private Key'
					rules={[
						{
							required: true,
							message: 'Please input your Private Key!',
						},
					]}
				>
					<div style={{ margin: '0 auto' }}>
						<textarea
							style={{
								margin: '0 auto',
								width: '100%',
								border: '1px solid #bfbfbf',
								outline: 'none',
							}}
							name=''
							id=''
							cols='90'
							rows='10'
						></textarea>
					</div>
				</Form.Item>
				<Form.Item>
					<Button
						style={{ marginTop: '1rem', float: 'right' }}
						size='large'
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RmForm;
