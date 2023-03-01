import { getToken, returnError } from './helperFunc';
import {
	allOutletsAction,
	createOutletAction,
	typesLookupAction,
	updateOutletAction,
	allMachinesAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const GET_OUTLET_SUCCESS = 'GET_OUTLET_SUCCESS';
const GET_OUTLET_FAIL = 'GET_OUTLET_FAIL';

const GET_MACHINES_SUCCESS = 'GET_MACHINES_SUCCESS';
const GET_MACHINES_FAIL = 'GET_MACHINES_FAIL';

const CREATE_OUTLET_SUCCESS = 'CREATE_OUTLET_SUCCESS';
const CREATE_OUTLET_FAIL = 'CREATE_OUTLET_FAIL';

const TYPE_LOOKUP_SUCCESS = 'TYPE_LOOKUP_SUCCESS';
const TYPE_LOOKUP_FAIL = 'TYPE_LOOKUP_FAIL';

const EDIT_OUTLET_SUCCESS = 'EDIT_OUTLET_SUCCESS';
const EDIT_OUTLET_FAIL = 'EDIT_OUTLET_FAIL';

const UPDATE_OUTLET_SUCCESS = 'UPDATE_OUTLET_SUCCESS';
const UPDATE_OUTLET_FAIL = 'UPDATE_OUTLET_FAIL';

// FOR OUTLETS

export const allOutlets = (operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await allOutletsAction(operatorId, token);
		// console.log('data', data)
		dispatch({ type: GET_OUTLET_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_OUTLET_FAIL, payload: returnError(error) });
	}
};

export const allMachines = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await allMachinesAction(token);
		// console.log('data', data);
		dispatch({ type: GET_MACHINES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_MACHINES_FAIL, payload: returnError(error) });
	}
};

export const createOutlet = (outlet) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await createOutletAction(outlet, token);

		dispatch({ type: CREATE_OUTLET_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CREATE_OUTLET_FAIL, payload: returnError(error) });
	}
};

export const updateOutlet = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		const token = getToken(user);

		const { data } = await updateOutletAction(reqBody, token);

		dispatch({ type: UPDATE_OUTLET_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_OUTLET_FAIL, payload: returnError(error) });
	}
};

// MACHINE TEMPLATE LOOKUP
export const typesLookup = () => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await typesLookupAction();

		dispatch({ type: TYPE_LOOKUP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: TYPE_LOOKUP_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	operator: null,
	error: null,
	loading: false,
	outlets: [],
	newOutlet: null,
	types: [],
	outletEdit: [],
	machines: [],
};

export const outletReducer = function (state = initialState, action) {
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

		case GET_MACHINES_SUCCESS:
			return {
				...state,
				machines: action.payload.data,
				loading: false,
				error: null,
			};

		case GET_OUTLET_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				outlets: action.payload.data,
				loading: false,
				error: null,
			};

		case CREATE_OUTLET_SUCCESS:
		case UPDATE_OUTLET_SUCCESS:
			return {
				...state,
				newOutlet: action.payload.data,
				loading: false,
				error: null,
			};

		case EDIT_OUTLET_SUCCESS:
			return {
				...state,
				outletEdit: action.payload.data,
				loading: false,
				error: null,
			};

		case TYPE_LOOKUP_SUCCESS:
			return {
				...state,
				types: action.payload.data,
				loading: false,
				error: null,
			};

		case GET_OUTLET_FAIL:
		case CREATE_OUTLET_FAIL:
		case TYPE_LOOKUP_FAIL:
		case UPDATE_OUTLET_FAIL:
		case EDIT_OUTLET_FAIL:
		case GET_MACHINES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
