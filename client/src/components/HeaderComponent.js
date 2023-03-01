import React, { useState, useEffect } from 'react';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import laundroLogo from '../images/logo/laundrologo.png';
import avatar from '../images/avatars/thumb-13.jpg';
import ProfileDropDown from './ProfileDropDown';
import { useSelector } from 'react-redux';
const { Header } = Layout;

const HeaderComponent = ({ collapsed, setCollapsed, setShowDrawer, showDrawer }) => {
	const { theme } = useSelector((state) => state.theme);
	const [logo, setLogo] = useState(null);
	const [headerAvatar, setHeaderAvatar] = useState(null);

	useEffect(() => {
		if (theme === 'laundro') {
			setLogo(laundroLogo);
			setHeaderAvatar(avatar);
		}
	}, [theme]);

	return (
		<div>
			<Header className='site-layout-background header-content-navbar' mode='horizontal'>
				<div>
					{collapsed ? null : (
						<img
							className='laundro-logo ms-4'
							src={logo}
							style={{ width: '100%', objectFit: 'contain' }}
							alt='brand logo'
						/>
					)}
				</div>
				<div className='header-navbar-links'>
					{/* // desktop view */}
					<div onClick={() => setCollapsed(!collapsed)} style={{ color: '#fff' }} className='desktop-view-menu'>
						{collapsed ? (
							<ArrowLeftOutlined className='icons-styling' />
						) : (
							<MenuOutlined className='icons-styling ms-5' />
						)}
					</div>

					{/* // this is for mobile view */}
					<div onClick={() => setShowDrawer(true)} style={{ color: '#fff' }} className='mobile-view-menu'>
						<MenuOutlined className='icons-styling' />
					</div>

					<div>
						<ProfileDropDown>
							<div className='logo-avatar'>
								<img src={headerAvatar} style={{ objectFit: 'contain', height: '35px' }} alt='avatar' />
							</div>
						</ProfileDropDown>
					</div>
				</div>
			</Header>
		</div>
	);
};

export default HeaderComponent;
