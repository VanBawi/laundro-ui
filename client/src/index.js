import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer, userReducer } from './reducer/userReducer';
import { remoteReducer } from './reducer/remoteReducer';
import { outletReducer } from './reducer/outletReducer';
import { reportReducer } from './reducer/reportsReducer';
import { salesReducer } from './reducer/salesData';
import { machineLogsReducer } from './reducer/machineLogReducer';
import { priceSettingReducer } from './reducer/priceSettingReducer';
import { reviewDashReducer } from './reducer/reviewDashReducer';
import { sumDashReducer, summaryAnnualReducer } from './reducer/sumDashReducer';
import { utilizationReducer } from './reducer/machineUtilReducer';
import themeReducer from './reducer/themeReducer';
import ThemeController from './theme/themeController';
import { roleReducer } from './reducer/roleReducer';
import { adminReducer } from './reducer/adminReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		outlets: outletReducer,
		remote: remoteReducer,
		reports: reportReducer,
		sales: salesReducer,
		machineLogs: machineLogsReducer,
		pricing: priceSettingReducer,
		reviewR: reviewDashReducer,
		dashboard: sumDashReducer,
		util: utilizationReducer,
		summaryAnnual: summaryAnnualReducer,
		theme: themeReducer,
		filterReducer: filterReducer,
		roleReducer: roleReducer,
		adminReducer: adminReducer,
	},
});

// console.log(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<Provider store={store}>
			<ThemeController>
				<App />
			</ThemeController>
		</Provider>
	</>
);

reportWebVitals();
