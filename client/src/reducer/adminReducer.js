import { returnError } from './helperFunc';
import {
	loginAdminAction,
	getClientsAction,
	addClientAction,
	addDistributorAction,
	addUserAction,
	getOperatorsAction,
	assignOperatorAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
const ADMIN_LOGIN_FAIL = 'ADMIN_LOGIN_FAIL';

const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
const ADD_CLIENT_FAIL = 'ADD_CLIENT_FAIL';

const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS';
const GET_CLIENTS_FAIL = 'GET_CLIENTS_FAIL';

const ADD_DISTRIBUTOR_SUCCESS = 'ADD_DISTRIBUTOR_SUCCESS';
const ADD_DISTRIBUTOR_FAIL = 'ADD_DISTRIBUTOR_FAIL';

const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';

const GET_OPERATORS_SUCCESS = 'GET_OPERATORS_SUCCESS';
const GET_OPERATORS_FAIL = 'GET_OPERATORS_FAIL';

const ASSIGN_OPERATOR_SUCCESS = 'ASSIGN_OPERATOR_SUCCESS';
const ASSIGN_OPERATOR_FAIL = 'ASSIGN_OPERATOR_FAIL';

export const loginAdmin = (loginUser) => async (dispatch) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { data } = await loginAdminAction(loginUser);

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_LOGIN_FAIL, payload: returnError(error) });
	}
};

export const addClient = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await addClientAction(reqBody, token);

		dispatch({ type: ADD_CLIENT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_CLIENT_FAIL, payload: returnError(error) });
	}
};

export const addDistributor = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await addDistributorAction(reqBody, token);

		dispatch({ type: ADD_DISTRIBUTOR_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_DISTRIBUTOR_FAIL, payload: returnError(error) });
	}
};

export const addUser = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';

		const { data } = await addUserAction(reqBody, token);

		dispatch({ type: ADD_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_USER_FAIL, payload: returnError(error) });
	}
};

export const getClients = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await getClientsAction(token);

		dispatch({ type: GET_CLIENTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_CLIENTS_FAIL, payload: returnError(error) });
	}
};

export const getOperators = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await getOperatorsAction(token);

		dispatch({ type: GET_OPERATORS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_OPERATORS_FAIL, payload: returnError(error) });
	}
};

export const assignOperator = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_LOADING });
		dispatch({ type: CLEAR_ERROR });

		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await assignOperatorAction(reqBody, token);

		dispatch({ type: ASSIGN_OPERATOR_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ASSIGN_OPERATOR_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	admin: null,
	token: localStorage.getItem('laundro-v2-admin-token') || null,
	clients: [],
	client: null,
	distributor: null,
	user: null,
	users: [],
	operators: [],
};

export const adminReducer = function (state = initialState, action) {
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

		case ASSIGN_OPERATOR_SUCCESS:
			return {
				...state,
				operator: action.payload.data,
				loading: false,
				error: null,
			};
		case ADD_DISTRIBUTOR_SUCCESS:
			return {
				...state,
				distributor: action.payload.data,
				loading: false,
				error: null,
			};

		case ADD_CLIENT_SUCCESS:
			return {
				...state,
				client: action.payload.data,
				loading: false,
				error: null,
			};

		case ADD_USER_SUCCESS:
			return {
				...state,
				user: action.payload.data,
				loading: false,
				error: null,
			};

		case GET_CLIENTS_SUCCESS:
			return {
				...state,
				clients: action.payload.data,
				loading: false,
				error: null,
			};

		case GET_OPERATORS_SUCCESS:
			return {
				...state,
				operators: action.payload.data,
				loading: false,
				error: null,
			};
		// user login and registration success
		case ADMIN_LOGIN_SUCCESS:
			// console.log('action.payload.', action.payload);
			if (action.payload.role === 'admin') {
				localStorage.setItem('laundro-v2-admin-token', action.payload.token);
			}

			return {
				...state,
				token: action.payload.token,
				admin: action.payload,
				loading: false,
				error: null,
			};

		// admin auth error and logout
		case ADMIN_LOGIN_FAIL:
		case GET_CLIENTS_FAIL:
		case ADD_CLIENT_FAIL:
		case ADD_USER_FAIL:
		case ASSIGN_OPERATOR_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
