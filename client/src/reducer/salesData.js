import { getToken, returnError } from './helperFunc';
import {
	annualSalesReportAction,
	totalDailySalesByMonthAction,
	totalOutletSalesByYearAction,
	totalOutletSalesMonthAction,
	annualBillReportAction,
	billReportMonthAction,
	dailySalesReportAction,
	annualTypeDistributionAction,
	monthTypeDistributionAction,
	annualWeightDistributionAction,
	monthWeightDistributionAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const BILL_ANNUAL_SUCCESS = 'BILL_ANNUAL_SUCCESS';
const BILL_ANNUAL_FAIL = 'BILL_ANNUAL_FAIL';
const BILL_MONTH_SUCCESS = 'BILL_MONTH_SUCCESS';
const BILL_MONTH_FAIL = 'BILL_MONTH_FAIL';
const BILL_DAILY_SUCCESS = 'BILL_DAILY_SUCCESS';
const BILL_DAILY_FAIL = 'BILL_DAILY_FAIL';
const ANNUAL_SALES_SUCCESS = 'ANNUAL_SALES_SUCCESS';
const ANNUAL_SALES_FAIL = 'ANNUAL_SALES_FAIL';
const DAILY_SALES_SUCCESS = 'DAILY_SALES_SUCCESS';
const DAILY_SALES_FAIL = 'DAILY_SALES_FAIL';
const OUTLETS_SALES_SUCCESS = 'OUTLETS_SALES_SUCCESS';
const OUTLETS_SALES_FAIL = 'OUTLETS_SALES_FAIL';
const OUTLETS_MONTH_SUCCESS = 'OUTLETS_MONTH_SUCCESS';
const OUTLETS_MONTH_FAIL = 'OUTLETS_MONTH_FAIL';
const TYPES_MONTH_SUCCESS = 'TYPES_MONTH_SUCCESS';
const TYPES_MONTH_FAIL = 'TYPES_MONTH_FAIL';
const TYPES_ANNUAL_SUCCESS = 'TYPES_ANNUAL_SUCCESS';
const TYPES_ANNUAL_FAIL = 'TYPES_ANNUAL_FAIL';
const WEIGHT_MONTH_SUCCESS = 'WEIGHT_MONTH_SUCCESS';
const WEIGHT_MONTH_FAIL = 'WEIGHT_MONTH_FAIL';
const WEIGHT_ANNUAL_SUCCESS = 'WEIGHT_ANNUAL_SUCCESS';
const WEIGHT_ANNUAL_FAIL = 'WEIGHT_ANNUAL_FAIL';

// FOR SALES PERFORMANCE

export const annualSalesReport = (year) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualSalesReportAction(year, token);

		dispatch({ type: ANNUAL_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ANNUAL_SALES_FAIL, payload: returnError(error) });
	}
};

export const totalDailySalesByMonth = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });
		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await totalDailySalesByMonthAction(reqBody, token);

		dispatch({ type: DAILY_SALES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: DAILY_SALES_FAIL, payload: returnError(error) });
	}
};

export const totalOutletSalesByYear = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await totalOutletSalesByYearAction(year, operatorId, token);

		dispatch({ type: OUTLETS_SALES_SUCCESS, payload: data });
		// console.log(data.data);
	} catch (error) {
		dispatch({ type: OUTLETS_SALES_FAIL, payload: returnError(error) });
	}
};

export const totalOutletSalesMonth = (year, month, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await totalOutletSalesMonthAction(year, month, operatorId, token);

		dispatch({ type: OUTLETS_MONTH_SUCCESS, payload: data });
	} catch (error) {
		// console.log('error', error)
		dispatch({ type: OUTLETS_MONTH_FAIL, payload: returnError(error) });
	}
};

export const annualBillReport = (year, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualBillReportAction(year, operatorId, token);

		dispatch({ type: BILL_ANNUAL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: BILL_ANNUAL_FAIL, payload: returnError(error) });
	}
};
export const billReportMonth = (year, month, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await billReportMonthAction(year, month, operatorId, token);

		dispatch({ type: BILL_MONTH_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: BILL_MONTH_FAIL, payload: returnError(error) });
	}
};

export const dailySalesReport = (date, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await dailySalesReportAction(date, operatorId, token);

		dispatch({ type: BILL_DAILY_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: BILL_DAILY_FAIL, payload: returnError(error) });
	}
};

export const annualTypeDistribution = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualTypeDistributionAction(reqBody, token);

		dispatch({ type: TYPES_ANNUAL_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: TYPES_ANNUAL_SUCCESS, payload: returnError(error) });
	}
};

export const monthTypeDistribution = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await monthTypeDistributionAction(reqBody, token);

		dispatch({ type: TYPES_MONTH_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: TYPES_MONTH_FAIL, payload: returnError(error) });
	}
};

export const annualWeightDistribution = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualWeightDistributionAction(reqBody, token);

		dispatch({ type: WEIGHT_ANNUAL_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: WEIGHT_ANNUAL_FAIL, payload: returnError(error) });
	}
};

export const monthWeightDistribution = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await monthWeightDistributionAction(reqBody, token);

		dispatch({ type: WEIGHT_MONTH_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: WEIGHT_MONTH_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	error: null,
	loading: false,
	annual: null,
	bill: null,
	outletSalesData: null,
	outletMonth: null,
	billAnnual: null,
	billMonth: null,
	salesDaily: null,
	typesAnnual: null,
	typesMonth: null,
	weightAnnual: null,
	weightMonth: null,
};

export const salesReducer = function (state = initialState, action) {
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
				annual: action.payload.data,
				loading: false,
				error: null,
			};

		case DAILY_SALES_SUCCESS:
			return {
				...state,
				daily: action.payload.data,
				loading: false,
				error: null,
			};

		case OUTLETS_SALES_SUCCESS:
			return {
				...state,
				outletSalesData: action.payload.data,
				loading: false,
				error: null,
			};

		case OUTLETS_MONTH_SUCCESS:
			return {
				...state,
				outletMonth: action.payload.data,
				loading: false,
				error: null,
			};

		case BILL_ANNUAL_SUCCESS:
			// console.log('action.payload', action.payload)
			return {
				...state,
				billAnnual: action.payload.data,
				loading: false,
				error: null,
			};

		case BILL_MONTH_SUCCESS:
			return {
				...state,
				billMonth: action.payload.data,
				loading: false,
				error: null,
			};

		case BILL_DAILY_SUCCESS:
			return {
				...state,
				salesDaily: action.payload.data,
				loading: false,
				error: null,
			};

		case TYPES_ANNUAL_SUCCESS:
			return {
				...state,
				typesAnnual: action.payload.data,
				loading: false,
				error: null,
			};

		case TYPES_MONTH_SUCCESS:
			return {
				...state,
				typesMonth: action.payload.data,
				loading: false,
				error: null,
			};

		case WEIGHT_ANNUAL_SUCCESS:
			return {
				...state,
				weightAnnual: action.payload.data,
				loading: false,
				error: null,
			};

		case WEIGHT_MONTH_SUCCESS:
			return {
				...state,
				weightMonth: action.payload.data,
				loading: false,
				error: null,
			};

		case BILL_ANNUAL_FAIL:
		case BILL_MONTH_FAIL:
		case BILL_DAILY_FAIL:
		case ANNUAL_SALES_FAIL:
		case DAILY_SALES_FAIL:
		case OUTLETS_SALES_FAIL:
		case OUTLETS_MONTH_FAIL:
		case TYPES_ANNUAL_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
