import React, { useEffect, useState } from 'react';
import {
	DashboardOutlined,
	DollarCircleOutlined,
	PoweroffOutlined,
	RetweetOutlined,
	ExperimentOutlined,
	CopyOutlined,
	SnippetsOutlined,
	FlagOutlined,
	UsergroupAddOutlined,
	MessageOutlined,
} from '@ant-design/icons';

import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Drawer, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, loyaltyAdminCheck } from '../reducer/userReducer';
const { Sider } = Layout;

const SideBarComponent = ({ collapsed, setCollapsed, showDrawer, setShowDrawer, devSideBars }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const currentPath = window.location.pathname;

	const { loyaltyToken, error, operator, distributor } = useSelector((state) => state.user);

	const stateData = location.state;

	function getItem(label, key, icon, children) {
		return {
			label,
			key,
			icon,
			children,
		};
	}

	const [items, setItems] = useState([
		getItem('Dashboard', '/mainDashboard', <DashboardOutlined />, null),
		getItem('Sales Performance', `/annualOverview`, <DollarCircleOutlined />, null),
		getItem('Machine Utilization', '/machineUtilization', <RetweetOutlined />, null),

		getItem('Remote Activation', '/remoteActivation', <PoweroffOutlined />, null),
		getItem('Utility Monitoring', '/utilityMonitoring', <ExperimentOutlined />),
		getItem('Browsable Report', 'sub6', <CopyOutlined />, [
			getItem('Transactions Record', '/transactions_record', null, null),
			getItem('Sales Summary', '/sales_summary', null, null),
			getItem('Epayment Record', '/epayment_record', null, null),
			getItem('Manual Pay Record', '/manualPay_record', null, null),
		]),
		getItem('Others', 'sub7', <SnippetsOutlined />, [
			getItem('Price Setting', '/priceList', null, null),
			// getItem("Machine CutOff", "/manualCutOff", null, null),
			// getItem("Inventory", "/vendingMaintain", null, null),
		]),
		getItem('Review Dashboard', `/reviewDashboard`, <FlagOutlined />, null),
		getItem('Loyalty Admin', '/redirectLoyaltyAdmin', <UsergroupAddOutlined />, null),
		getItem('Machine Logging', '/machineLog', <MessageOutlined />, null),
	]);

	const redirectToLoyaltyAdmin = () => {
		dispatch(loyaltyAdminCheck());
	};

	useEffect(() => {
		if (error) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (loyaltyToken) {
			window.location.href = loyaltyToken;
		}
	}, [loyaltyToken]);

	useEffect(() => {
		if (operator || distributor) {
			const getUser = () => {
				if (operator) return operator;
				return distributor;
			};
			// console.log(getUser());
			if (getUser().permissions && getUser().permissions.length) {
				const availablePermissions = getUser()
					.permissions.filter((permission) => permission.type === 'laundro' && permission.permission)
					.map((permission) => permission.title);

				let newItems = [];

				for (let i = 0; i < items.length; i++) {
					const { label, children } = items[i];
					if (children && children.length) {
						let newChildren = [];
						for (let j = 0; j < children.length; j++) {
							if (availablePermissions.includes(children[j].label)) newChildren.push(children[j]);
						}
						if (newChildren.length)
							newItems.push({
								...items[i],
								children: newChildren,
							});
					} else {
						if (availablePermissions.includes(label)) newItems.push(items[i]);
					}
				}

				setItems(newItems);
			}
		}
	}, [operator, distributor]);

	// { state: { userType: 'operator' } }

	// console.log('loyaltyToken', loyaltyToken);
	// console.log('stateData', stateData);
	return (
		<Sider width='250' className='sidebar-sider' trigger={null} collapsible collapsed={collapsed}>
			<div className='sidebar-menu-logo' />

			<div className='d-flex flex-column justify-content-between'>
				<div>
					{showDrawer ? (
						<Drawer
							headerStyle={{ height: '300px' }}
							placement='left'
							width='250'
							onClose={() => setShowDrawer(false)}
							open={showDrawer}
						>
							<Menu
								defaultSelectedKeys={[currentPath]}
								theme='light'
								mode='inline'
								items={items}
								onClick={(e) => {
									setShowDrawer(false);
									// console.log('e', e.key)
									if (e.key === '/redirectLoyaltyAdmin') {
										return redirectToLoyaltyAdmin();
									} else {
										navigate(e.key, { state: stateData });
										dispatch(clearFilter());
									}
								}}
							/>
						</Drawer>
					) : (
						<Menu
							defaultSelectedKeys={[currentPath]}
							theme='light'
							mode='inline'
							items={items}
							onClick={(e) => {
								if (e.key === '/redirectLoyaltyAdmin') {
									return redirectToLoyaltyAdmin();
								} else {
									navigate(e.key, { state: stateData });
									dispatch(clearFilter());
								}
							}}
						/>
					)}
				</div>
			</div>
		</Sider>
	);
};

export default SideBarComponent;
