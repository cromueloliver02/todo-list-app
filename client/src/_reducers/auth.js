import {
	USER_LOADED,
	REGISTER_SUCCESS,
	AUTH_SUCCESS,
	AUTH_ERROR,
	REGISTER_FAIL,
	AUTH_FAIL,
	SET_AUTH_LOADING
} from '../_actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false
			};
		case REGISTER_SUCCESS:
		case AUTH_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
			// case AUTH_ERROR:
			// case REGISTER_FAIL:
			// case AUTH_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case SET_AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
