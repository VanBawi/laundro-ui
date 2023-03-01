import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import avatar from '../images/avatars/thumb-13.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_SUCCESS } from '../reducer/userReducer';

const ProfileDropDown = ({ children }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.theme);
	const { operator, distributor, staff, error } = useSelector((state) => state.user);
	const [brand, setBrand] = useState('');
	const [username, setUsername] = useState('');
	const [headerAvatar, setHeaderAvatar] = useState(null);

	const navigate = useNavigate();
	const stateData = location.state;

	function logout() {
		localStorage.clear();

		dispatch({ type: LOGOUT_SUCCESS });
		if (stateData && stateData.userType) {
			navigate(`/${stateData.userType}_login`);
		} else {
			navigate('/operator_login');
		}
	}

	// console.log('staff', staff);

	useEffect(() => {
		if (theme === 'laundro') {
			if (operator) {
				setUsername(operator.data.username);
			}

			setBrand('The Laundro');
			setHeaderAvatar(avatar);
		}
	}, [theme]);

	const items = [
		{
			key: '1',
			label: (
				<div className='d-flex align-items-center border-bottom py-1'>
					<div>
						<img src={headerAvatar} style={{ objectFit: 'contain', height: '35px' }} alt='avatar' />
					</div>
					<div className='mx-2'>
						<div>{username}</div>
						<small className='text-muted'>{brand}</small>
					</div>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div
					onClick={() => {
						navigate('/op_setting', { state: stateData });
					}}
					className='d-flex align-items-center py-1'
				>
					<SettingOutlined />
					<div className='mx-2 text-muted'>Setting</div>
				</div>
			),
		},

		{
			key: '3',
			label: (
				<div className='d-flex align-items-center py-1' onClick={logout}>
					<PoweroffOutlined />

					<div className='mx-2 text-muted'>Logout</div>
				</div>
			),
		},
	];

	return (
		<div style={{ width: '200px' }}>
			<Dropdown menu={{ items }} placement='bottomRight'>
				{children}
			</Dropdown>
		</div>
	);
};

export default ProfileDropDown;
