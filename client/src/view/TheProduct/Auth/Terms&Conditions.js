import React, { useEffect, useState } from 'react';
import './termspolicy.css';
import { useSelector } from 'react-redux';

const TermsConditions = () => {
	const { theme } = useSelector((state) => state.theme);
	const [name, setName] = useState('');
	const [logo, setLogo] = useState(null);

	useEffect(() => {
		if (theme === 'laundro') {
			setName('Company X');
		}
	}, [theme]);

	return (
		<div className='main-container'>
			<img src={logo} alt='' />
			<div className='content-container'>
				<h2>Welcome to {name}</h2>
				<h3>These terms and conditions outline the rules and regulations for the use of {name}'s Website.</h3>
			</div>
		</div>
	);
};
export default TermsConditions;
