import { getToken, returnError } from './helperFunc';
import {
	annualUtilReportAction,
	outletDailyUtilAction,
	machineUtilTimeAnnualAction,
	annualTempPreferenceAction,
	monthTempPreferenceAction,
	monthlyUtilReportAction,
	machineUtilTimeMonthAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const ANNUAL_UTIL_SUCCESS = 'ANNUAL_UTIL_SUCCESS';
const ANNUAL_UTIL_FAIL = 'ANNUAL_UTIL_FAIL';
const ANNUAL_TEMP_SUCCESS = 'ANNUAL_TEMP_SUCCESS';
const ANNUAL_TEMP_FAIL = 'ANNUAL_TEMP_FAIL';
const MONTH_TEMP_SUCCESS = 'MONTH_TEMP_SUCCESS';
const MONTH_TEMP_FAIL = 'MONTH _TEMP_FAIL';

const OUTLET_DAILY_UTIL_SUCCESS = 'OUTLET_DAILY_UTIL_SUCCESS';
const OUTLET_DAILY_UTIL_FAIL = 'OUTLET_DAILY_UTIL_FAIL';

const MACHINE_UTIL_TIME_SUCCESS = 'MACHINE_UTIL_TIME_SUCCESS';
const MACHINE_UTIL_TIME_FAIL = 'MACHINE_UTIL_TIME_FAIL';
const UTIL_TIME_MONTH_SUCCESS = 'UTIL_TIME_MONTH_SUCCESS';
const UTIL_TIME_MONTH_FAIL = 'UTIL_TIME_MONTH_FAIL';

const MONTHLY_UTIL_SUCCESS = 'MONTHLY_UTIL_SUCCESS';
const MONTHLY_UTIL_FAIL = 'MONTHLY_UTIL_FAIL';

// FOR MACHINE UTILIZATION

export const annualUtilReport = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await annualUtilReportAction(reqBody, token);

		dispatch({ type: ANNUAL_UTIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ANNUAL_UTIL_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const outletDailyUtil = (year, month, outletId, operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await outletDailyUtilAction(year, month, outletId, operatorId, token);

		dispatch({ type: OUTLET_DAILY_UTIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: OUTLET_DAILY_UTIL_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const machineUtilTimeAnnual = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await machineUtilTimeAnnualAction(reqBody, token);

		dispatch({ type: MACHINE_UTIL_TIME_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MACHINE_UTIL_TIME_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const machineUtilTimeMonth = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await machineUtilTimeMonthAction(reqBody, token);

		dispatch({ type: UTIL_TIME_MONTH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UTIL_TIME_MONTH_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const annualTempPreference = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);
		const { data } = await annualTempPreferenceAction(reqBody, token);

		dispatch({ type: ANNUAL_TEMP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ANNUAL_TEMP_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const monthTempPreference = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await monthTempPreferenceAction(reqBody, token);

		dispatch({ type: MONTH_TEMP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MONTH_TEMP_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

export const monthlyUtilReport = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await monthlyUtilReportAction(reqBody, token);

		dispatch({ type: MONTHLY_UTIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MONTHLY_UTIL_FAIL, payload: returnError(error) });
		// console.log(error);
	}
};

const initialState = {
	language: 'en',
	error: null,
	loading: false,
	utilization: null,
	annualUtil: null,
	outletUtilDaily: null,
	utilDaily: [],
	annualTemp: null,
	monthTemp: null,
	monthlyUtilData: null,
	machineUtil: null,
	machineUtilMonth: null,
};

export const utilizationReducer = function (state = initialState, action) {
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

		case ANNUAL_UTIL_SUCCESS:
			return {
				...state,
				annualUtil: action.payload.data,
				loading: false,
				error: null,
			};

		case MONTHLY_UTIL_SUCCESS:
			return {
				...state,
				monthlyUtilData: action.payload.data,
				loading: false,
				error: null,
			};

		case OUTLET_DAILY_UTIL_SUCCESS:
			return {
				...state,
				outletUtilDaily: action.payload.data,
				loading: false,
				error: null,
			};

		case MACHINE_UTIL_TIME_SUCCESS:
			return {
				...state,
				machineUtil: action.payload.data,
				loading: false,
				error: null,
			};

		case UTIL_TIME_MONTH_SUCCESS:
			return {
				...state,
				machineUtilMonth: action.payload.data,
				loading: false,
				error: null,
			};

		case ANNUAL_TEMP_SUCCESS:
			return {
				...state,
				annualTemp: action.payload.data,
				loading: false,
				error: null,
			};

		case MONTH_TEMP_SUCCESS:
			return {
				...state,
				monthTemp: action.payload.data,
				loading: false,
				error: null,
			};

		case ANNUAL_UTIL_FAIL:
		case OUTLET_DAILY_UTIL_FAIL:
		case MACHINE_UTIL_TIME_FAIL:
		case ANNUAL_TEMP_FAIL:
		case MONTH_TEMP_FAIL:
		case MONTHLY_UTIL_FAIL:
		case UTIL_TIME_MONTH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
