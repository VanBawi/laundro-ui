import React, { useState, useEffect } from 'react';
import './termspolicy.css';
import laundroLogo from '../../../images/logo/laundrologo.png';
import { useSelector } from 'react-redux';

const PrivacyPolicy = () => {
	const { theme } = useSelector((state) => state.theme);
	const [logo, setLogo] = useState(null);

	useEffect(() => {
		if (theme === 'laundro') {
			setLogo(laundroLogo);
		}
	}, [theme]);

	return (
		<div className='main-container'>
			<img src={logo} alt='' />
			<div className='content-container'>
				<h2>Welcome to our Privacy Policy</h2>
				<h3>Your privacy is critically important to us.</h3>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
