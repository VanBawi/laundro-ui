import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import '../operator.css';
import '../../Sales Performance/salesperformance.css';
import laundroLogo from '../../../../images/logo/laundrologo.png';
import { useDispatch, useSelector } from 'react-redux';
import { registerStaffAction } from '../../../../reducer/requestEndpoints';

const StaffRegister = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const { error } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);

	const [slogan, setSlogan] = useState('');
	const [text, setText] = useState('');
	const [logo, setLogo] = useState(null);

	const success = () => {
		message.open({
			type: 'success',
			content: 'A verification link has been sent to your email!',
			duration: 4,
		});
	};

	const fail = (err) => {
		message.open({
			type: 'error',
			content: err,
			duration: 4,
		});
	};

	// console.log("operator", operator);

	const onFinish = (values) => {
		// console.log('Values', values);
		registerStaffAction(values)
			.then((res) => {
				success();
				form.resetFields();
			})
			.catch((err) => fail(err.response.data.error.en));
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				fail();
			}, 3000);
			return;
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
		<div className='register-pg-container'>
			<div style={{ float: 'left' }} className='laundro-container-register'>
				<div>
					<img className='laundro-login-logo' src={logo} alt='' />
					<h4 className='mt-4 heading' style={{ color: 'white', fontSize: '2.3rem' }}>
						{slogan}
					</h4>
					<p className='mt-4 mb-4 heading-p' style={{ color: 'white', marginTop: '1rem !important' }}>
						{text}
					</p>
				</div>
				<div className='desktop-terms-register'>
					<a className='login-link' href='/terms&conditions'>
						Terms & Conditions
					</a>

					<a className='login-link' href='/privacypolicy'>
						Privacy & Policy
					</a>
				</div>
			</div>
			<div className='content-contain register'>
				<div className='card register-form'>
					<div style={{ marginBottom: '1.5rem' }} className='form-header'>
						<h2>Create your account</h2>
					</div>
					<Form name='normal_login' onFinish={onFinish} form={form} layout='vertical'>
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
							name='operatorId'
							label='Operator ID'
							rules={[
								{
									required: true,
									message: 'Please input your Operator Id!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
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

						<Form.Item
							name='confirm'
							dependencies={['password']}
							label='Confirm Password'
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('The two passwords that you entered do not match!'));
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item>
							<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
								Create Account
							</Button>
						</Form.Item>
					</Form>
					<span style={{ color: 'grey' }}>Already have an account?</span> <a href='/staff_login'>Sign in</a>
					<br />
					<div>
						<span>By signing up you agree to our</span> <a href='/terms&conditions'>Terms & </a>
						<a href='/privacypolicy'>Policy</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaffRegister;
