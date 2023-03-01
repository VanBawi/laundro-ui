import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import '../operator.css';
import '../../Sales Performance/salesperformance.css';
import laundroLogo from '../../../../images/logo/laundrologo.png';
import { loginStaff } from '../../../../reducer/userReducer';
import { useNavigate, Link } from 'react-router-dom';

// to do
// 1. check user credentials
// 2. redirect to setting page if no existing outlet
// 3. if outlet exists, redirect to dashboard
// 4. make sure localstorage has the token stored

// const UserContext = useContext();
const StaffLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { staff, error } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);
	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [slogan, setSlogan] = useState('');
	const [text, setText] = useState('');
	const [logo, setLogo] = useState(null);

	// console.log(UserContext);
	const onFinish = (values) => {
		setSubmitted(true);
		dispatch(loginStaff(values));
	};

	useEffect(() => {
		if (staff && submitted) {
			setSubmitted(false);

			if (staff && staff.role === 'staff' && staff.permissions && staff.permissions.length) {
				const allPages = [
					{ label: 'Dashboard', pagePath: '/mainDashboard' },
					{ label: 'Sales Performance', pagePath: '/annualOverview' },
					{ label: 'Machine Utilization', pagePath: '/machineUtilization' },
					{ label: 'Remote Activation', pagePath: '/remoteActivation' },
					{ label: 'Utility Monitoring', pagePath: '/utilityMonitoring' },
					{ label: 'Transactions Record', pagePath: '/transactions_record' },
					{ label: 'Sales Summary', pagePath: '/sales_summary' },
					{ label: 'Epayment Record', pagePath: '/epayment_record' },
					{ label: 'Manual Pay Record', pagePath: '/manualPay_record' },
					{ label: 'Price Setting', pagePath: '/priceList' },
					{ label: 'Review Dashboard', pagePath: '/reviewDashboard' },
					{ label: 'Loyalty Admin', pagePath: '/redirectLoyaltyAdmin' },
					{ label: 'Machine Logging', pagePath: '/machineLog' },
				];

				const availablePermissions = staff.permissions
					.filter((permission) => permission.type === 'laundro' && permission.permission)
					.map((permission) => permission.title);

				const availablePages = allPages.filter((item) => availablePermissions.includes(item.label));
				const firstPage = availablePages[0];
				navigate(firstPage.pagePath, { state: { userType: 'staff' } });
			} else {
				navigate('/mainDashboard', { state: { userType: 'staff' } });
			}
		}
	}, [staff, submitted]);

	// console.log("operator ----- ---", operator, submitted);

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
				<div className='pt-4 desktop-terms'>
					<a className='login-link' href='/terms&conditions'>
						Terms & Conditions
					</a>{' '}
					<a className='login-link' href='/privacypolicy'>
						Privacy & Policy
					</a>
				</div>
			</div>
			<div className='card mx-3 mt-3 py-5 px-4' style={{ maxWidth: '500px' }}>
				<div className='mb-2'>
					<h2>Staff Login</h2>
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
						{/* <a className='login-form-forgot' href='#'>
							Forgot password?
						</a> */}
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							Login
						</Button>
					</Form.Item>
				</Form>
				<span style={{ color: 'grey' }}>Franchisor Login?</span>{' '}
				<Link className='other-login' to='/distributor_login'>
					Franchisor Login
				</Link>
				<br />
				<span style={{ color: 'grey' }}>Operator Login?</span>{' '}
				<Link className='other-login' to='/operator_login'>
					Operator Login
				</Link>
			</div>

			<div className='mobile-terms text-center pb-3'>
				<a className='login-link' href='/terms&conditions'>
					Terms & Conditions
				</a>

				<a className='login-link' href='/privacypolicy'>
					Privacy & Policy
				</a>
			</div>
		</div>
	);
};

export default StaffLogin;
