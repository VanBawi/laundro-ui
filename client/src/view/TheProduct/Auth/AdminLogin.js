import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import './operator.css';
import '../Sales Performance/salesperformance.css';
import laundroLogo from '../../../images/logo/laundrologo.png';
import { loginAdmin } from '../../../reducer/adminReducer';

const AdminLogin = () => {
	const dispatch = useDispatch();

	const { admin, error } = useSelector((state) => state.adminReducer);
	const { theme } = useSelector((state) => state.theme);
	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [slogan, setSlogan] = useState('');
	const [text, setText] = useState('');
	const [logo, setLogo] = useState(null);

	// console.log(UserContext);
	const onFinish = (values) => {
		setSubmitted(true);
		dispatch(loginAdmin(values));
	};

	useEffect(() => {
		if (admin && submitted) {
			setSubmitted(false);
			window.location.href = '/role/dashboard';
		}
	}, [admin, submitted]);

	// console.log("operator ----- ---", operator, submitted);
	// console.log('admin', admin);
	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
			}
		}
	}, [error]);

	useEffect(() => {
		if (theme === 'laundro') {
			setSlogan('Digitize Your Product');
			setText('Manage your product at your fingertips.');
			setLogo(laundroLogo);
		}
	}, [theme]);

	return (
		<div className='login-main-container d-sm-flex justify-content-evenly'>
			<div className='mx-3 pt-3'>
				<div>
					<img className='laundro-login-logo py-4' src={logo} alt='brand logo' />
					<h3 className=' text-white heading-text'>{slogan}</h3>
					<div className='py-4' style={{ color: 'white' }}>
						{text}
					</div>
				</div>
			</div>
			<div className='card mx-3 mt-3 py-5 px-4' style={{ maxWidth: '500px' }}>
				<div>
					<h2>Admin Login</h2>
					<p>Please enter your user name and password to login</p>
				</div>
				<Form name='normal_login' onFinish={onFinish}>
					<Form.Item
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your Username!',
							},
						]}
					>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
							visibilityToggle={{
								visible: passwordVisible,
								onVisibleChange: setPasswordVisible,
							}}
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						/>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AdminLogin;
