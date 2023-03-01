import { getToken, returnError } from './helperFunc';
import { machinesLogsAction, addMachineLogAction, updateMachineLogAction } from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const ADD_LOG_SUCCESS = 'ADD_LOG_SUCCESS';
const ADD_LOG_FAIL = 'ADD_LOG_FAIL';

const GET_LOGS_SUCCESS = 'GET_LOGS_SUCCESS';
const GET_LOGS_FAIL = 'GET_LOGS_FAIL';

const UPDATE_LOG_SUCCESS = 'UPDATE_LOG_SUCCESS';
const UPDATE_LOG_FAIL = 'UPDATE_LOG_FAIL';

// FOR OUTLETS

export const machineLogs = (operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await machinesLogsAction(operatorId, token);

		dispatch({ type: GET_LOGS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_LOGS_FAIL, payload: returnError(error) });
	}
};

export const addMachineLog = (formData) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await addMachineLogAction(formData, token);

		dispatch({ type: ADD_LOG_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_LOG_FAIL, payload: returnError(error) });
	}
};

export const updateMachineLog = (formData) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await updateMachineLogAction(formData, token);

		dispatch({ type: UPDATE_LOG_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_LOG_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	log: null,
	error: null,
	loading: false,
	machineLoggings: [],
	machineLog: null,
};

export const machineLogsReducer = function (state = initialState, action) {
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

		case GET_LOGS_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				machineLoggings: action.payload.data,
				loading: false,
				error: null,
			};
		case ADD_LOG_SUCCESS:
		case UPDATE_LOG_SUCCESS:
			return {
				...state,
				machineLog: action.payload.data,
				error: null,
			};

		case GET_LOGS_FAIL:
		case ADD_LOG_FAIL:
		case UPDATE_LOG_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
