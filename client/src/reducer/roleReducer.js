import { returnError } from './helperFunc';
import {
	getRoleListAction,
	addRoleAction,
	assignRoleAction,
	editRoleAction,
	deleteRoleAction,
	getPermissionsAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS';
const ADD_ROLE_FAIL = 'ADD_ROLE_FAIL';

const ASSIGN_ROLE_SUCCESS = 'ASSIGN_ROLE_SUCCESS';
const ASSIGN_ROLE_FAIL = 'ASSIGN_ROLE_FAIL';

const GET_ROLE_LIST_SUCCESS = 'GET_ROLE_LIST_SUCCESS';
const GET_ROLE_LIST_FAIL = 'GET_ROLE_LIST_FAIL';

const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
const DELETE_ROLE_FAIL = 'DELETE_ROLE_FAIL';

const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
const UPDATE_ROLE_FAIL = 'UPDATE_ROLE_FAIL';

const GET_PERMISSIONS_SUCCESS = 'GET_PERMISSIONS_SUCCESS';
const GET_PERMISSIONS_FAIL = 'GET_PERMISSIONS_FAIL';

// FOR PRICE SETTING

export const getRoleList = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });
		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		// console.log('stateData', adminReducer);
		const { data } = await getRoleListAction(token);

		dispatch({ type: GET_ROLE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_ROLE_LIST_FAIL, payload: returnError(error) });
	}
};

export const getPermissions = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });
		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		// console.log('stateData', adminReducer);
		const { data } = await getPermissionsAction(token);

		dispatch({ type: GET_PERMISSIONS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_PERMISSIONS_FAIL, payload: returnError(error) });
	}
};

export const addRole = (newRole) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });
		const { adminReducer } = getState();
		const token = adminReducer ? adminReducer.token : '';
		const { data } = await addRoleAction(newRole, token);

		dispatch({ type: ADD_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_ROLE_FAIL, payload: returnError(error) });
	}
};

export const assignRole = (newRole) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await assignRoleAction(newRole);

		dispatch({ type: ASSIGN_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ASSIGN_ROLE_FAIL, payload: returnError(error) });
	}
};

export const updateRole = (updateData) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await editRoleAction(updateData);

		dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_ROLE_FAIL, payload: returnError(error) });
	}
};

export const deleteRole = (id) => async (dispatch) => {
	try {
		const { data } = await deleteRoleAction(id);

		dispatch({ type: DELETE_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: DELETE_ROLE_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	error: null,
	loading: false,
	roleLists: [],
	role: null,
	permissions: [],
};

export const roleReducer = function (state = initialState, action) {
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

		case GET_PERMISSIONS_SUCCESS:
			return {
				...state,
				permissions: action.payload.data,
				loading: false,
				error: null,
			};

		case GET_ROLE_LIST_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				roleLists: action.payload.data,
				loading: false,
				error: null,
			};
		case ADD_ROLE_SUCCESS:
		case ASSIGN_ROLE_SUCCESS:
			return {
				...state,
				role: action.payload.data,
				loading: false,
				error: null,
				success: true,
			};
		case UPDATE_ROLE_SUCCESS:
			return {
				...state,
				role: action.payload.data,
				loading: false,
				error: null,
				success: true,
			};
		case DELETE_ROLE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				removed: true,
			};

		case GET_ROLE_LIST_FAIL:
		case ASSIGN_ROLE_FAIL:
		case UPDATE_ROLE_FAIL:
		case DELETE_ROLE_FAIL:
		case GET_PERMISSIONS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
