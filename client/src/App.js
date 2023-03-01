import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MainPageLayout from './components/MainPageLayout';
import { updateTheme } from './reducer/themeReducer';
import { useDispatch } from 'react-redux';
import AdminPageLayout from './components/AdminPageLayout';
import DoPaymentCheck from './view/TheProduct/Auth/DoPaymentCheck';

const PrivacyPolicy = lazy(() => import('./view/TheProduct/Auth/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./view/TheProduct/Auth/Terms&Conditions'));

// auth
const OperatorLogin = lazy(() => import('./view/TheProduct/Auth/OperatorLogin.js'));
const OperatorRegister = lazy(() => import('./view/TheProduct/Auth/OperatorRegister.js'));
const OperatorVerify = lazy(() => import('./view/TheProduct/Auth/OperatorVerify.js'));

// Admin login
const AdminLogin = lazy(() => import('./view/TheProduct/Auth/AdminLogin'));

const DistributorLogin = lazy(() => import('./view/TheProduct/Auth/DistributorLogin.js'));

// Staff login
const StaffLogin = lazy(() => import('./view/TheProduct/Auth/staff/StaffLogin'));
const StaffRegister = lazy(() => import('./view/TheProduct/Auth/staff/StaffRegister'));

// user
const UserProfile = lazy(() => import('./view/TheProduct/User/UserProfile.js'));
const UserSetting = lazy(() => import('./view/TheProduct/User/UserSetting.js'));

const SummaryDashboard = lazy(() => import('./view/TheProduct/Dashboard/SummaryDashboard.js'));
const SalesPerformance = lazy(() => import('./view/TheProduct/Sales Performance/SalesPerformance.js'));
const MachineUtilization = lazy(() => import('./view/TheProduct/Machine Utilization/MachineUtilization.js'));
const RemoteActivation = lazy(() => import('./view/TheProduct/Remote Activation/RemoteActivation.js'));
const UtilityMonitoring = lazy(() => import('./view/TheProduct/Utility Monitoring/UtilityMonitoring.js'));
// browsable reports
const TransactionsRecord = lazy(() => import('./view/TheProduct/Browsable Reports/TransactionsRecord.js'));
const EpayRecord = lazy(() => import('./view/TheProduct/Browsable Reports/EpayRecord.js'));
const ManualPayRecord = lazy(() => import('./view/TheProduct/Browsable Reports/ManualPayRecord.js'));
const SalesSummary = lazy(() => import('./view/TheProduct/Browsable Reports/SalesSummary.js'));

//price setting
const PriceList = lazy(() => import('./view/TheProduct/Others/PriceSetting/PriceList'));
const Inventory = lazy(() => import('./view/TheProduct/Others/Inventory'));
const MachineCutOff = lazy(() => import('./view/TheProduct/Others/MachineCutOff'));
const ReviewDashboard = lazy(() => import('./view/TheProduct/Review Dashboard/ReviewDashboard'));

const MachineLogging = lazy(() => import('./view/TheProduct/Machine Logging/MachineLogging'));

const DevRoleMainDashboard = lazy(() => import('./view/TheProduct/Role Management/DevRoleMainDashboard'));
const RoleList = lazy(() => import('./view/TheProduct/Role Management/RoleList'));

const RoleUserList = lazy(() => import('./view/TheProduct/Role Management/RoleUserList'));
const DistributorsDashboard = lazy(() => import('./view/TheProduct/Role Management/DistributorsDashboard'));

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		if (window.location.href.includes('localhost')) {
			dispatch(updateTheme('laundro'));

			// title replacement
			document.title = 'The Product';
			// favicon replacement
			document.querySelector('#my-icon').setAttribute('href', './laundro/favicon.ico');
			document.querySelector('#my-apple-icon').setAttribute('href', './laundro/logo192.png');
			// manifest json replace
			document.querySelector('#my-manifest-placeholder').setAttribute('href', './laundro/manifest.json');
		}
	}, [window.location.href]);

	// console.log("outlets", outlets, error)

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/operator_login' element={<OperatorLogin />} />
					<Route exact path='/operator_register' element={<OperatorRegister />} />
					<Route exact path='/verify' element={<OperatorVerify />} />

					<Route exact path='/admin_login' element={<AdminLogin />} />

					<Route exact path='/distributor_login' element={<DistributorLogin />} />

					<Route exact path='/doPayment' element={<DoPaymentCheck />} />

					<Route exact path='/staff_login' element={<StaffLogin />} />
					<Route exact path='/staff_register' element={<StaffRegister />} />

					<Route
						exact
						path='/mainDashboard'
						element={
							<MainPageLayout devSideBars={true}>
								<SummaryDashboard />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/op_profile'
						element={
							<MainPageLayout devSideBars={true}>
								<UserProfile />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/op_setting'
						element={
							<MainPageLayout devSideBars={true}>
								<UserSetting />
							</MainPageLayout>
						}
					/>
					<Route exact path='/privacypolicy' element={<PrivacyPolicy />} />
					<Route exact path='/terms&conditions' element={<TermsConditions />} />

					<Route
						exact
						path='/annualOverview'
						element={
							<MainPageLayout devSideBars={true}>
								<SalesPerformance />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/machineUtilization'
						element={
							<MainPageLayout devSideBars={true}>
								<MachineUtilization />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/remoteActivation'
						element={
							<MainPageLayout devSideBars={true}>
								<RemoteActivation />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/priceList'
						element={
							<MainPageLayout devSideBars={true}>
								<PriceList />
							</MainPageLayout>
						}
					/>

					<Route
						exact
						path='/utilityMonitoring'
						element={
							<MainPageLayout devSideBars={true}>
								<UtilityMonitoring />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/transactions_record'
						element={
							<MainPageLayout devSideBars={true}>
								<TransactionsRecord />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/epayment_record'
						element={
							<MainPageLayout devSideBars={true}>
								<EpayRecord />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/manualPay_record'
						element={
							<MainPageLayout devSideBars={true}>
								<ManualPayRecord />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/sales_summary'
						element={
							<MainPageLayout devSideBars={true}>
								<SalesSummary />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/reviewDashboard'
						element={
							<MainPageLayout devSideBars={true}>
								<ReviewDashboard />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/inventory'
						element={
							<MainPageLayout devSideBars={true}>
								<Inventory />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/manualCutOff'
						element={
							<MainPageLayout devSideBars={true}>
								<MachineCutOff />
							</MainPageLayout>
						}
					/>
					<Route
						exact
						path='/machineLog'
						element={
							<MainPageLayout devSideBars={true}>
								<MachineLogging />
							</MainPageLayout>
						}
					/>

					<Route
						exact
						path='/role/dashboard'
						element={
							<AdminPageLayout devSideBars={false}>
								<DevRoleMainDashboard />
							</AdminPageLayout>
						}
					/>
					<Route
						exact
						path='/roleList'
						element={
							<AdminPageLayout devSideBars={false}>
								<RoleList />
							</AdminPageLayout>
						}
					/>
					<Route
						exact
						path='/userList/:clientId'
						element={
							<AdminPageLayout devSideBars={false}>
								<RoleUserList />
							</AdminPageLayout>
						}
					/>

					<Route
						exact
						path='/distributors/:clientId'
						element={
							<AdminPageLayout devSideBars={false}>
								<DistributorsDashboard />
							</AdminPageLayout>
						}
					/>

					<Route path='*' element={<Navigate to='/mainDashboard' />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
