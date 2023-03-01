// Setup config/headers and token
export const returnError = (error) => {
	// console.log('error print here', error.response);
	if (error.response) {
		if (error.response.data) {
			if (error.response.data.error?.en === 'Token Expired') {
				setTimeout(() => {
					return (window.location.href = '/operator_login');
				}, 1500);
			} else {
				return error.response.data.error;
			}
		}
	} else {
		return { en: 'Internal Error' };
	}
	const errorMsg = error.response && error.response.data ? error.response.data.error : 'Internal Error';
	return errorMsg;
};

const tokenConfig = (tokenBody) => {
	let token = localStorage.getItem('laundro-v2-operator-token');
	// console.log('token', token)
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//if there is a token then add it to the header
	if (token) {
		// operator token
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	// distributor token or admin token
	if (tokenBody) {
		config.headers['Authorization'] = `Bearer ${tokenBody}`;
	}

	// console.log('first config ----------', config)
	return config;
};

const headerConfig = () => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
	};
};

export const getToken = (user) => {
	if (user) {
		if (user.operator) {
			return user.operator.token;
		} else if (user.staff) {
			return user.staff.token;
		} else if (user.distributor) {
			return user.distributor.token;
		}
	}
};

export const configToken = tokenConfig();

export { tokenConfig, headerConfig };
