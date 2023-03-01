import axios from 'axios';


export const registerOperator = (data, callback) =>
	axios
		.post('/api/auth/v1/operator/register', data)
		.then((res) => callback(null, res.data))
		.catch((err) => callback(err.response.data.error));

