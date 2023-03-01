import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Sales Performance/salesperformance.css';
import './operator.css';
import laundroLogo from '../../../images/logo/laundrologo.png';
import { verifyOperatorAction } from '../../../reducer/requestEndpoints';

// 1. get token
// 2. send to backend
// 3. once token verified direct to login
// 4. if not verified throw error

const OperatorVerify = () => {
	const { theme } = useSelector((state) => state.theme);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [slogan, setSlogan] = useState('');
	const [text, setText] = useState('');
	const [logo, setLogo] = useState(null);

	const getToken = searchParams.get('token');
	// console.log("operator error", operator, error);

	const success = () => {
		message.open({
			type: 'success',
			content: 'Verification Successful!',
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
	// console.log(getToken);
	useEffect(() => {
		verifyOperatorAction(getToken)
			.then((res) => {
				// console.log(res.data.data.type);

				success();
				setTimeout(() => {
					if (res.data.data) {
						navigate(`/${res.data.data.type}_login`);
					}
				}, 5000);
			})
			.catch((err) => {
				fail(err.response.data.error.en);
			});
	}, [getToken]);

	useEffect(() => {
		if (theme === 'laundro') {
			setSlogan('Digitize Your Product');
			setText('Manage your product at your fingertips.');
			setLogo(laundroLogo);
		}
	}, [theme]);

	return (
		<div className='verify-pg-container main-container'>
			<div style={{ width: '50%' }} className=''>
				<div style={{ marginLeft: '2%', marginBottom: '5%' }}>
					<div>
						<img style={{ width: '40%' }} className='' src={logo} alt='brand logo' />
						<h4 className='mt-4 heading-text'>{slogan}</h4>
						<p className='mt-4 mb-3' style={{ color: 'white', marginTop: '1rem !important' }}>
							{text}
						</p>
					</div>
					<div className='desktop-terms'>
						<a className='login-link' href='/terms&conditions'>
							Terms & Conditions
						</a>

						<a className='login-link' href='/privacypolicy'>
							Privacy & Policy
						</a>
					</div>
				</div>
				<div
					style={{
						padding: '4rem 2rem',
						display: 'grid',
						placeItems: 'center',
						width: '80%',
					}}
					className='card'
				>
					<div style={{ marginBottom: '1.5rem' }}>
						<h3>
							Thank you for registering and verifying.
							<CheckCircleOutlined style={{ color: 'green', marginLeft: '.5rem' }} />
						</h3>
						<p className='mt-3'>You will be redirected once the verification is complete</p>
					</div>
				</div>
			</div>
			<div className='mobile-terms'>
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

export default OperatorVerify;
