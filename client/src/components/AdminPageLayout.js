import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import SideBarComponent from './SideBarComponent';
import HeaderComponent from './HeaderComponent';

import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { checkUserSession } from '../reducer/userReducer';
import CustomSidebarComponent from './CustomSidebarComponent';

const { Content } = Layout;

const AdminPageLayout = ({ children, devSideBars, franchisorSideBars, adminSideBars }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [collapsed, setCollapsed] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const { error, admin, token } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		if (token) {
			dispatch(checkUserSession(token));
		}
	}, [dispatch, token]);

	// console.log('admin', admin);

	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
				if (error.en === 'Token Expired') {
					// localStorage.removeItem('laundro-v2-admin-token');
				}
				if (error.en === 'Token Expired' || error.en === 'Unauthorized Request') {
					// console.log('hit here admin_login');
					return (window.location.href = '/admin_login');
				}
			}
		}
	}, [error]);

	// console.log('hit error', error)

	// console.log('operator', operator)
	// console.log('token', token)

	return (
		<div className='main-page-container'>
			<Layout hasSider>
				{devSideBars ? (
					<SideBarComponent
						showDrawer={showDrawer}
						setShowDrawer={setShowDrawer}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				) : (
					<CustomSidebarComponent
						devSideBars={devSideBars}
						showDrawer={showDrawer}
						setShowDrawer={setShowDrawer}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				)}

				<Layout
					style={{ background: '#f7fbff' }}
					className={collapsed ? 'sidebar-width-container-collapse' : 'sidebar-width-container-xcollapse'}
				>
					{devSideBars ? (
						<HeaderComponent
							setShowDrawer={setShowDrawer}
							showDrawer={showDrawer}
							collapsed={collapsed}
							setCollapsed={setCollapsed}
						/>
					) : (
						<HeaderComponent
							setShowDrawer={setShowDrawer}
							showDrawer={showDrawer}
							collapsed={collapsed}
							setCollapsed={setCollapsed}
						/>
					)}
					<Content className='content-container'>{children}</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default AdminPageLayout;
