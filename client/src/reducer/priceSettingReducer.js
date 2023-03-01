import { getToken, returnError } from './helperFunc';
import {
	getPriceListAction,
	addPricingAction,
	assignPricingAction,
	editPricingAction,
	deletePricingAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const ADD_PRICING_SUCCESS = 'ADD_PRICING_SUCCESS';
const ADD_PRICING_FAIL = 'ADD_PRICING_FAIL';

const ASSIGN_PRICING_SUCCESS = 'ASSIGN_PRICING_SUCCESS';
const ASSIGN_PRICING_FAIL = 'ASSIGN_PRICING_FAIL';

const GET_PRICE_LIST_SUCCESS = 'GET_PRICE_LIST_SUCCESS';
const GET_PRICE_LIST_FAIL = 'GET_PRICE_LIST_FAIL';

const DELETE_PRICING_SUCCESS = 'DELETE_PRICING_SUCCESS';
const DELETE_PRICING_FAIL = 'DELETE_PRICING_FAIL';

const UPDATE_PRICING_SUCCESS = 'UPDATE_PRICING_SUCCESS';
const UPDATE_PRICING_FAIL = 'UPDATE_PRICING_FAIL';

// FOR PRICE SETTING

export const getPriceList = (operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await getPriceListAction(operatorId, token);

		dispatch({ type: GET_PRICE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_PRICE_LIST_FAIL, payload: returnError(error) });
	}
};

export const addPricing = (newPrice) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await addPricingAction(newPrice, token);

		dispatch({ type: ADD_PRICING_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_PRICING_FAIL, payload: returnError(error) });
	}
};

export const assignPricing = (newPrice) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await assignPricingAction(newPrice, token);

		dispatch({ type: ASSIGN_PRICING_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ASSIGN_PRICING_FAIL, payload: returnError(error) });
	}
};

export const updatePricing = (updateData) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await editPricingAction(updateData, token);

		dispatch({ type: UPDATE_PRICING_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_PRICING_FAIL, payload: returnError(error) });
	}
};

export const deletePricing = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await deletePricingAction(id, token);

		dispatch({ type: DELETE_PRICING_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: DELETE_PRICING_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	priceList: null,
	loading: false,
	priceLists: [],
};

export const priceSettingReducer = function (state = initialState, action) {
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

		case GET_PRICE_LIST_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				priceLists: action.payload.data,
				loading: false,
				error: null,
			};
		case ADD_PRICING_SUCCESS:
			return {
				...state,
				price: action.payload.data,
				loading: false,
				error: null,
				success: true,
			};
		case ASSIGN_PRICING_SUCCESS:
			return {
				...state,
				assigned: action.payload.data,
				loading: false,
				error: null,
				success: true,
			};
		case UPDATE_PRICING_SUCCESS:
			return {
				...state,
				priceUpdated: action.payload.data,
				loading: false,
				error: null,
				success: true,
			};
		case DELETE_PRICING_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				removed: true,
			};

		case GET_PRICE_LIST_FAIL:
		case ASSIGN_PRICING_FAIL:
		case UPDATE_PRICING_FAIL:
		case DELETE_PRICING_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
