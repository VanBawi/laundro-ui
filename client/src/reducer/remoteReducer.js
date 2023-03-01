import { getToken, returnError } from './helperFunc';
import { remoteMachineAction, remoteActivateAction, machineMonitorAction, stopMachineAction } from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const SET_LOADING2 = 'SET_LOADING2';

const REMOTE_MACHINES_SUCCESS = 'REMOTE_MACHINES_SUCCESS';
const REMOTE_MACHINES_FAIL = 'REMOTE_MACHINES_FAIL';

const REMOTE_ACTIVATION_SUCCESS = 'REMOTE_ACTIVATION_SUCCESS';
const REMOTE_ACTIVATION_FAIL = 'REMOTE_ACTIVATION_FAIL';

const MACHINE_MONITOR_SUCCESS = 'MACHINE_MONITOR_SUCCESS';
const MACHINE_MONITOR_FAIL = 'MACHINE_MONITOR_FAIL';

const STOP_MACHINE_SUCCESS = 'STOP_MACHINE_SUCCESS';
const STOP_MACHINE_FAIL = 'STOP_MACHINE_FAIL';

// FOR REMOTE ACTIVATION

export const remoteMachine = (operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await remoteMachineAction(operatorId, token);

		dispatch({ type: REMOTE_MACHINES_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: REMOTE_MACHINES_FAIL, payload: returnError(error) });
	}
};

export const updateRemoteMachine = (data) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		dispatch({ type: REMOTE_MACHINES_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: REMOTE_MACHINES_FAIL, payload: returnError(error) });
	}
};

export const remoteActivate = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await remoteActivateAction(values, token);

		dispatch({ type: REMOTE_ACTIVATION_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: REMOTE_ACTIVATION_FAIL, payload: returnError(error) });
	}
};

export const machineMonitor = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await machineMonitorAction(values, token);

		dispatch({ type: MACHINE_MONITOR_SUCCESS, payload: data });
		// console.log(data);
	} catch (error) {
		dispatch({ type: MACHINE_MONITOR_FAIL, payload: returnError(error) });
	}
};

export const stopWasherMachine = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING2 });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await stopMachineAction(values, token);

		dispatch({ type: STOP_MACHINE_SUCCESS, payload: data });
		console.log(data);
	} catch (error) {
		dispatch({ type: STOP_MACHINE_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	operator: null,
	error: null,
	loading: false,
	machineData: [],
	stopLoading: false,
};

export const remoteReducer = function (state = initialState, action) {
	switch (action.type) {
		// this is for fetching loading time setter
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		case SET_LOADING2:
			return {
				...state,
				stopLoading: true,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		case REMOTE_MACHINES_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				machineData: action.payload.data,
				loading: false,
				error: null,
			};

		case REMOTE_ACTIVATION_SUCCESS:
			return {
				...state,
				paid: action.payload.data,
				loading: false,
				error: null,
				monitor: null,
			};

		case MACHINE_MONITOR_SUCCESS:
			return {
				...state,
				paid: null,
				monitor: action.payload.data,
				loading: false,
				error: null,
			};

		case STOP_MACHINE_SUCCESS:
			console.log('action.payload', action.payload);
			return {
				...state,
				paid: null,
				monitor: null,
				stop: action.payload.data,
				stopLoading: false,
				error: null,
			};

		case REMOTE_MACHINES_FAIL:
		case REMOTE_ACTIVATION_FAIL:
		case MACHINE_MONITOR_FAIL:
		case STOP_MACHINE_FAIL:
			return {
				loading: false,
				error: action.payload,
				stopLoading: false,
			};

		default:
			return state;
	}
};
