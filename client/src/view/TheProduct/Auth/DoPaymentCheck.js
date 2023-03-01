import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkDoPaymentUrl } from '../../../reducer/requestEndpoints';

const DoPaymentCheck = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const operatorCode = searchParams.get('operatorCode');
	const machineNo = searchParams.get('machineNo');
	const outletCode = searchParams.get('outletCode');

	// console.log('operatorCode', operatorCode);
	useEffect(() => {
		const redirectUrl = '';
		axios
			.get(`${checkDoPaymentUrl}?operatorCode=${operatorCode}`)
			.then((response) => {
				// // redirect to
				if (response.data) {
					// console.log('response', response);
					const resOperatorCode = response.data.data;

					const finalUrl = `${redirectUrl}machineNo=${machineNo}&outletCode=${outletCode}&operatorCode=${resOperatorCode}&opId=${operatorCode}`;

					window.location.replace(finalUrl);
				}
			})
			.catch((error) => {
				const finalUrl = `${redirectUrl}machineNo=${machineNo}&outletCode=${outletCode}&operatorCode=${operatorCode}`;
				window.location.replace(finalUrl);
			});
	});

	return <div className='text-center py-5'>Redirecting ...</div>;
};

export default DoPaymentCheck;
