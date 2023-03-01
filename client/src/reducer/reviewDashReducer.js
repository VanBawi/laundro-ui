import { getToken, returnError } from './helperFunc';
import { getReviewsAction, resolveReviewAction } from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const RESOLVE_REVIEW_SUCCESS = 'RESOLVE_REVIEW_SUCCESS';
const RESOLVE_REVIEW_FAIL = 'RESOLVE_REVIEW_FAIL';

const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
const GET_REVIEWS_FAIL = 'GET_REVIEWS_FAIL';

// FOR OUTLETS

export const getReviews = (query) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await getReviewsAction(query, token);

		dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_REVIEWS_FAIL, payload: returnError(error) });
	}
};

export const resolveReview = (reqBody) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await resolveReviewAction(reqBody, token);

		dispatch({ type: RESOLVE_REVIEW_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: RESOLVE_REVIEW_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	error: null,
	loading: false,
	reviews: [],
	review: null,
};

export const reviewDashReducer = function (state = initialState, action) {
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

		case GET_REVIEWS_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				reviews: action.payload,
				loading: false,
				error: null,
			};
		case RESOLVE_REVIEW_SUCCESS:
			return {
				...state,
				review: action.payload.data,
				error: null,
			};

		case GET_REVIEWS_FAIL:
		case RESOLVE_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
