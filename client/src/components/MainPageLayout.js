import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import SideBarComponent from './SideBarComponent';
import HeaderComponent from './HeaderComponent';

import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../reducer/userReducer';
import CustomSidebarComponent from './CustomSidebarComponent';
const { Content } = Layout;

const MainPageLayout = ({ children, devSideBars, franchisorSideBars, adminSideBars }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const { operator, distributor, staff, userType } = useSelector((state) => state.user);

	const userReducer = useSelector((state) => state.user);

	const stateData = location.state;
	const token = userReducer && userReducer[`${stateData && stateData.userType}Token`];

	useEffect(() => {
		if (token) {
			dispatch(checkUserSession(token));
		} else {
			window.location.href = stateData && stateData.userType ? `/${stateData.userType}_login` : '/operator_login';
		}
	}, [dispatch, token]);

	// console.log('token', token);
	// console.log('stateData', stateData);
	// console.log('stateData', stateData);
	// console.log('token', token);
	// console.log('userReducer', userReducer);

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
					{operator || distributor || staff ? <Content className='content-container'>{children}</Content> : null}
				</Layout>
			</Layout>
		</div>
	);
};

export default MainPageLayout;
