import axios from 'axios';
import { setAlert } from './alert';
import { clearTasks } from './task';
import setAuthToken from '../utils/setAuthToken';
import {
	USER_LOADED,
	REGISTER_SUCCESS,
	AUTH_SUCCESS,
	AUTH_ERROR,
	REGISTER_FAIL,
	AUTH_FAIL,
	LOGOUT,
	SET_AUTH_LOADING
} from './types';

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const register = (
	{ name, email, password },
	match
) => async dispatch => {
	dispatch({ type: SET_AUTH_LOADING });

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = { name, email, password };

		const res = await axios.post('/api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: REGISTER_FAIL });
	}
};

export const login = ({ email, password }) => async dispatch => {
	dispatch({ type: SET_AUTH_LOADING });

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = { email, password };

		const res = await axios.post('/api/auth', body, config);

		dispatch({
			type: AUTH_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: AUTH_FAIL });
	}
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });

	dispatch(clearTasks());
};
