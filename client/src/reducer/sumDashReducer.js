import { getToken, returnError } from './helperFunc';
import {
	machineStatusAction,
	channelSalesAction,
	machineSalesAction,
	weeklySalesAction,
	totalOutletSalesByYearAction,
	annualSalesReportAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const MACHINE_STATUS_SUCCESS = 'MACHINE_STATUS_SUCCESS';
const MACHINE_STATUS_FAIL = 'MACHINE_STATUS_FAIL';
const CHANNEL_SALES_SUCCESS = 'CHANNEL_SALES_SUCCESS';
const CHANNEL_SALES_FAIL = 'CHANNEL_SALES_FAIL';
const MACHINE_SALES_SUCCESS = 'MACHINE_SALES_SUCCESS';
const MACHINE_SALES_FAIL = 'MACHINE_SALES_FAIL';
const ANNUAL_SALES_SUCCESS = 'ANNUAL_SALES_SUCCESS';
const ANNUAL_SALES_FAIL = 'ANNUAL_SALES_FAIL';
const LASTWEEK_SALES_SUCCESS = 'LASTWEEK_SALES_SUCCESS';
const LASTWEEK_SALES_FAIL = 'LASTWEEK_SALES_FAIL';
const OUTLET_SALES_SUCCESS = 'OUTLET_SALES_SUCCESS';
const OUTLET_SALES_FAIL = 'OUTLET_SALES_FAIL';
const CLEAR_FILTER_SUCCESS = 'CLEAR_FILTER_SUCCESS';
const TOP_SALES_SUCCESS = 'TOP_SALES_SUCCESS';
const TOP_SALES_FAIL = 'TOP_SALES_FAIL';

const WEEKLY_SALES_SUCCESS = 'WEEKLY_SALES_SUCCESS';
const WEEKLY_SALES_FAIL = 'WEEKLY_SALES_FAIL';

export const machineStatus = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();

		const token = getToken(user);

		const { data } = await machineStatusAction(year, operatorId, token);

		dispatch({ type: MACHINE_STATUS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MACHINE_STATUS_FAIL, payload: returnError(error) });
	}
};

export const channelSalesData = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await channelSalesAction(year, operatorId, token);

		dispatch({ type: CHANNEL_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CHANNEL_SALES_FAIL, payload: returnError(error) });
	}
};

export const machineSalesData = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await machineSalesAction(year, operatorId, token);

		dispatch({ type: MACHINE_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MACHINE_SALES_FAIL, payload: returnError(error) });
	}
};

export const annualSalesByYear = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualSalesReportAction(reqBody, token);

		dispatch({ type: ANNUAL_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ANNUAL_SALES_FAIL, payload: returnError(error) });
	}
};

export const last7DaysSales = () => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await last7DaysSales();

		dispatch({ type: LASTWEEK_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LASTWEEK_SALES_FAIL, payload: returnError(error) });
	}
};

export const weeklySales = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await weeklySalesAction(year, operatorId, token);

		dispatch({ type: WEEKLY_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: WEEKLY_SALES_FAIL, payload: returnError(error) });
	}
};

export const topSales = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await totalOutletSalesByYearAction(year, operatorId, token);

		dispatch({ type: TOP_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: TOP_SALES_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	error: null,
	loading: false,
};

export const sumDashReducer = function (state = initialState, action) {
	switch (action.type) {
		// this is for fetching loading time setter
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		case MACHINE_STATUS_SUCCESS:
			return {
				...state,
				status: action.payload.data,
				loading: false,
				error: null,
			};
		case CHANNEL_SALES_SUCCESS:
			return {
				...state,
				channelSales: action.payload.data,
				loading: false,
				error: null,
			};
		case MACHINE_SALES_SUCCESS:
			return {
				...state,
				machineSales: action.payload.data,
				loading: false,
				error: null,
			};
		case ANNUAL_SALES_SUCCESS:
			return {
				...state,
				annualSales: action.payload.data,
				loading: false,
				error: null,
			};

		case LASTWEEK_SALES_SUCCESS:
			return {
				...state,
				last7Days: action.payload.data,
				loading: false,
				error: null,
			};

		case OUTLET_SALES_SUCCESS:
			return {
				...state,
				outletSales: action.payload.data,
				loading: false,
				error: null,
			};

		case MACHINE_STATUS_FAIL:
		case CHANNEL_SALES_FAIL:
		case MACHINE_SALES_FAIL:
		case ANNUAL_SALES_FAIL:
		case OUTLET_SALES_FAIL:
		case LASTWEEK_SALES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_FILTER_SUCCESS:
			return {
				error: null,
				loading: false,
			};

		default:
			return state;
	}
};

const initialState2 = {
	error: null,
	loading: false,
	annualSales: null,
	weeklySalesData: null,
	topSalesData: null,
};

export const summaryAnnualReducer = function (state = initialState2, action) {
	switch (action.type) {
		// this is for fetching loading time setter
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		case ANNUAL_SALES_SUCCESS:
			return {
				...state,
				annualSales: action.payload.data,
				loading: false,
				error: null,
			};

		case TOP_SALES_SUCCESS:
			return {
				...state,
				topSalesData: action.payload.data,
				loading: false,
				error: null,
			};
		case WEEKLY_SALES_SUCCESS:
			return {
				...state,
				weeklySalesData: action.payload.data,
				loading: false,
				error: null,
			};

		case WEEKLY_SALES_FAIL:
		case CHANNEL_SALES_FAIL:
		case TOP_SALES_FAIL:
		case ANNUAL_SALES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_FILTER_SUCCESS:
			return {
				error: null,
				loading: false,
			};

		default:
			return state;
	}
};
