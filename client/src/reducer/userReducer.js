import { getToken, returnError } from './helperFunc';
import {
	registerOperatorAction,
	verifyOperatorAction,
	loginOperatorAction,
	createRMAction,
	checkSessionAction,
	loyaltyAdminCheckAction,
	fetchRMAction,
	loginDistributorAction,
	fetchOperatorsAction,
	loginStaffAction,
} from './requestEndpoints';

const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

const STAFF_LOGIN_SUCCESS = 'STAFF_LOGIN_SUCCESS';
const STAFF_LOGIN_FAIL = 'STAFF_LOGIN_FAIL';

const OPERATOR_LOGIN_SUCCESS = 'OPERATOR_LOGIN_SUCCESS';
const OPERATOR_LOGIN_FAIL = 'OPERATOR_LOGIN_FAIL';

const DISTRIBUTOR_LOGIN_SUCCESS = 'DISTRIBUTOR_LOGIN_SUCCESS';
const DISTRIBUTOR_LOGIN_FAIL = 'DISTRIBUTOR_LOGIN_FAIL';

const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';

const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

const USER_VERIFY_SUCCESS = 'USER_VERIFY_SUCCESS';
const USER_VERIFY_FAIL = 'USER_VERIFY_FAIL';

const CREATE_RM_SUCCESS = 'CREATE_RM_SUCCESS';
const CREATE_RM_FAIL = 'CREATE_RM_FAIL';

const FETCH_RM_SUCCESS = 'FETCH_RM_SUCCESS';
const FETCH_RM_FAIL = 'FETCH_RM_FAIL';

const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

const LOYALTY_ADMIN_CHECK_SUCCESS = 'LOYALTY_ADMIN_CHECK_SUCCESS';
const LOYALTY_ADMIN_CHECK_FAIL = 'LOYALTY_ADMIN_CHECK_FAIL';

const SUMMARY_FILTER_SUCCESS = 'SUMMARY_FILTER_SUCCESS';
const SUMMARY_FILTER_FAIL = 'SUMMARY_FILTER_FAIL';

const SALES_PERFORMANCE_FILTER_SUCCESS = 'SALES_PERFORMANCE_FILTER_SUCCESS';
const SALES_PERFORMANCE_FILTER_FAIL = 'SALES_PERFORMANCE_FILTER_FAIL';

const MACHINE_UTIL_FILTER_SUCCESS = 'MACHINE_UTIL_FILTER_SUCCESS';
const MACHINE_UTIL_FILTER_FAIL = 'MACHINE_UTIL_FILTER_FAIL';

const CLEAR_FILTER_SUCCESS = 'CLEAR_FILTER_SUCCESS';

const FETCH_OPERATORS_SUCCESS = 'FETCH_OPERATORS_SUCCESS';
const FETCH_OPERATORS_FAIL = 'FETCH_OPERATORS_FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const registerOperator = (newUser) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = registerOperatorAction(newUser);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_REGISTER_FAIL, payload: returnError(error) });
	}
};

export const verifyOperator = (token, callback) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = verifyOperatorAction(token);
		// callback();
		dispatch({ type: USER_VERIFY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_VERIFY_FAIL, payload: returnError(error) });
	}
};

export const loginStaff = (loginUser) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await loginStaffAction(loginUser);

		// console.log(loginUser, data);

		dispatch({ type: STAFF_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: STAFF_LOGIN_FAIL, payload: returnError(error) });
	}
};

export const loginOperator = (loginUser) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await loginOperatorAction(loginUser);

		// console.log(loginUser, data);

		dispatch({ type: OPERATOR_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: OPERATOR_LOGIN_FAIL, payload: returnError(error) });
	}
};

export const loginDistributor = (loginUser) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { data } = await loginDistributorAction(loginUser);

		dispatch({ type: DISTRIBUTOR_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: DISTRIBUTOR_LOGIN_FAIL, payload: returnError(error) });
	}
};

// /distributor/login
// export const changePassword = (values) => async (dispatch) => {
//   try {
//     dispatch({ type: CLEAR_ERROR });
//
//     dispatch({ type: SET_LOADING });

//     const config = tokenConfig();
//     const { data } = await axios.put(
//       `/api/auth/v1/password/reset`,
//       values,
//       config
//     );
//     // 'unauthorized request' trying to use requestEndpoints

//     dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: CHANGE_PASSWORD_FAIL, payload: returnError(error) });
//   }
// };

export const createRM = (RmDetails) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });

		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await createRMAction(RmDetails, token);

		dispatch({ type: CREATE_RM_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CREATE_RM_FAIL, payload: returnError(error) });
	}
};

export const checkUserSession = (token) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ERROR });

		const { data } = await checkSessionAction(token);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: returnError(error) });
	}
};

export const fetchRM = (operatorId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const token = getToken(user);

		const { data } = await fetchRMAction(operatorId, token);

		dispatch({ type: FETCH_RM_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({ type: FETCH_RM_FAIL, payload: returnError(error) });
	}
};

export const loyaltyAdminCheck = () => async (dispatch, getState) => {
	const { user } = getState();
	// console.log('user', user);
	const token = getToken(user);
	try {
		const { data } = await loyaltyAdminCheckAction(token);

		dispatch({ type: LOYALTY_ADMIN_CHECK_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LOYALTY_ADMIN_CHECK_FAIL, payload: returnError(error) });
	}
};

export const fetchOperators = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CLEAR_ERROR });
		dispatch({ type: SET_LOADING });

		const { user } = getState();
		// console.log('user', user);
		const distributorToken = user ? user.distributor.token : '';

		// console.log('token', token);
		const { data } = await fetchOperatorsAction(distributorToken);

		dispatch({ type: FETCH_OPERATORS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_OPERATORS_FAIL, payload: returnError(error) });
	}
};

const initialState = {
	language: 'en',
	operator: null,
	error: null,
	loading: false,
	rmExist: [],
	loyaltyToken: null,
	staffToken: localStorage.getItem('laundro-v2-staff-token'),
	operatorToken: localStorage.getItem('laundro-v2-operator-token'),
	distributorToken: localStorage.getItem('laundro-v2-distributor-token'),
	operators: [],
	distributor: null,
	staff: null,
};

export const userReducer = function (state = initialState, action) {
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

		case CREATE_RM_SUCCESS:
			return {
				...state,
				rm: action.payload,
				loading: false,
				error: null,
			};

		case FETCH_RM_SUCCESS:
			return {
				...state,
				rmExist: action.payload,
				loading: false,
				error: null,
			};

		case STAFF_LOGIN_SUCCESS:
			// console.log('action.payload.', action.payload);
			if (action.payload.role === 'staff') {
				localStorage.setItem('laundro-v2-staff-token', action.payload.token);
			}

			return {
				...state,
				[action.payload.role]: action.payload,
				[`${action.payload.role}Token`]: action.payload.token,
				loading: false,
				error: null,
			};

		// user login and registration success
		case OPERATOR_LOGIN_SUCCESS:
			// console.log('action.payload.', action.payload);
			if (action.payload.role === 'operator') {
				localStorage.setItem('laundro-v2-operator-token', action.payload.token);
			}

			return {
				...state,
				[action.payload.role]: action.payload,
				[`${action.payload.role}Token`]: action.payload.token,
				loading: false,
				error: null,
			};
		case DISTRIBUTOR_LOGIN_SUCCESS:
			if (action.payload.role === 'distributor') {
				localStorage.setItem('laundro-v2-distributor-token', action.payload.token);
			}

			return {
				...state,
				[action.payload.role]: action.payload,
				[`${action.payload.role}Token`]: action.payload.token,
				loading: false,
				error: null,
			};

		case USER_REGISTER_SUCCESS:
		case USER_DETAILS_SUCCESS:
			// console.log('action.payload', action.payload);
			return {
				...state,
				[action.payload.role]: action.payload,
				loading: false,
				error: null,
			};

		case CHANGE_PASSWORD_SUCCESS:
			// console.log("action.payload", action.payload);
			return {
				...state,
				password: action.payload,
				loading: false,
				error: null,
			};

		case LOYALTY_ADMIN_CHECK_SUCCESS:
			return {
				...state,
				loyaltyToken: action.payload.data,
			};

		case FETCH_OPERATORS_SUCCESS:
			// console.log('action.payload', action.payload);
			return {
				...state,
				operators: action.payload.data,
				loading: false,
				error: null,
			};

		// user auth error and logout
		case USER_REGISTER_FAIL:
		case USER_VERIFY_FAIL:
		case OPERATOR_LOGIN_FAIL:
		case CHANGE_PASSWORD_FAIL:
		case CREATE_RM_FAIL:
		case USER_DETAILS_FAIL:
		case FETCH_RM_FAIL:
		case DISTRIBUTOR_LOGIN_FAIL:
		case FETCH_OPERATORS_FAIL:
		case LOYALTY_ADMIN_CHECK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const dashboardFilter = () => async (dispatch) => {
	try {
		dispatch({ type: SUMMARY_FILTER_SUCCESS });
	} catch (error) {
		dispatch({ type: SUMMARY_FILTER_FAIL, payload: returnError(error) });
	}
};

export const salesDashboardFilter = () => async (dispatch) => {
	try {
		dispatch({ type: SALES_PERFORMANCE_FILTER_SUCCESS });
	} catch (error) {
		dispatch({ type: SUMMARY_FILTER_FAIL, payload: returnError(error) });
	}
};

export const machineUtilizationFilter = () => async (dispatch) => {
	try {
		dispatch({ type: MACHINE_UTIL_FILTER_SUCCESS });
	} catch (error) {
		dispatch({ type: SUMMARY_FILTER_FAIL, payload: returnError(error) });
	}
};

export const clearFilter = () => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_FILTER_SUCCESS });
	} catch (error) {
		dispatch({ type: SUMMARY_FILTER_FAIL, payload: returnError(error) });
	}
};

const filterInitialState = {
	summaryDashboardFilter: false,
	salesPerformanceFilter: false,
	machineUtilFilter: false,
};

export const filterReducer = function (state = filterInitialState, action) {
	switch (action.type) {
		// this is for fetching loading time setter
		case SUMMARY_FILTER_SUCCESS:
			return {
				summaryDashboardFilter: true,
				salesPerformanceFilter: false,
				machineUtilFilter: false,
			};

		case SALES_PERFORMANCE_FILTER_SUCCESS:
			return {
				summaryDashboardFilter: false,
				salesPerformanceFilter: true,
				machineUtilFilter: false,
			};
		case MACHINE_UTIL_FILTER_SUCCESS:
			return {
				summaryDashboardFilter: false,
				salesPerformanceFilter: false,
				machineUtilFilter: true,
			};
		case CLEAR_FILTER_SUCCESS:
		case SUMMARY_FILTER_FAIL:
		case SALES_PERFORMANCE_FILTER_FAIL:
		case MACHINE_UTIL_FILTER_FAIL:
			return {
				summaryDashboardFilter: false,
				salesPerformanceFilter: false,
				machineUtilFilter: false,
			};

		default:
			return state;
	}
};
