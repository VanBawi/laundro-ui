import { getToken, returnError } from './helperFunc';
import { transReportAction, summaryReportAction, epayReportAction, manualPayReportAction } from './requestEndpoints';
import { LOGOUT_SUCCESS } from './userReducer';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const TRANSACTION_REPORT_SUCCESS = 'TRANSACTION_REPORT_SUCCESS';
const TRANSACTION_REPORT_FAIL = 'TRANSACTION_REPORT_FAIL';

const SALES_SUMMARY_SUCCESS = 'SALES_SUMMARY_SUCCESS';
const SALES_SUMMARY_FAIL = 'SALES_SUMMARY_FAIL';

const EPAY_RECORD_SUCCESS = 'EPAY_RECORD_SUCCESS';
const EPAY_RECORD_FAIL = 'EPAY_RECORD_FAIL';

const MANUALPAY_RECORD_SUCCESS = 'MANUALPAY_RECORD_SUCCESS';
const MANUALPAY_RECORD_FAIL = 'MANUALPAY_RECORD_FAIL';

// FOR BROWSABLE REPORTS

// /api/report/sales/v1/epayment
// /api/report/sales/v1/manualpay

export const transReport = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await transReportAction(values, token);

		dispatch({ type: TRANSACTION_REPORT_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: TRANSACTION_REPORT_FAIL, payload: returnError(error) });
	}
};

export const summaryReport = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await summaryReportAction(values, token);

		dispatch({ type: SALES_SUMMARY_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: SALES_SUMMARY_FAIL, payload: returnError(error) });
	}
};

export const epayReport = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await epayReportAction(values, token);
		// console.log(data);
		dispatch({ type: EPAY_RECORD_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: EPAY_RECORD_FAIL, payload: returnError(error) });
	}
};

export const manualPayReport = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await manualPayReportAction(values, token);

		dispatch({ type: MANUALPAY_RECORD_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: MANUALPAY_RECORD_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	operator: null,
	error: null,
	loading: false,
};

export const reportReducer = function (state = initialState, action) {
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

		case TRANSACTION_REPORT_SUCCESS:
			// console.log('action.payload', action.payload);
			return {
				report: action.payload.data,
				loading: false,
				error: null,
			};

		case SALES_SUMMARY_SUCCESS:
			// console.log('action.payload', action.payload);
			return {
				summary: action.payload.data,
				loading: false,
				error: null,
			};

		case EPAY_RECORD_SUCCESS:
			return {
				epay: action.payload.data,
				loading: false,
				error: null,
			};

		case MANUALPAY_RECORD_SUCCESS:
			return {
				manual: action.payload.data,
				loading: false,
				error: null,
			};

		case LOGOUT_SUCCESS:
			return initialState;

		case TRANSACTION_REPORT_FAIL:
		case SALES_SUMMARY_FAIL:
		case EPAY_RECORD_FAIL:
		case MANUALPAY_RECORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
