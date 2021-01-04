import axios from 'axios';
import {
	GET_TASKS,
	CREATE_TASK,
	DELETE_TASK,
	TOGGLE_DONE_TASK,
	CLEAR_TASKS,
	SET_TASK_LOADING,
	TASK_ERROR
} from './types';

export const getTasks = () => async dispatch => {
	dispatch(setLoading());

	try {
		const res = await axios.get('/api/tasks');

		dispatch({
			type: GET_TASKS,
			payload: res.data
		});
	} catch (err) {
		console.error(err.message);
		console.log(err.response.data);
		dispatch({
			type: TASK_ERROR,
			payload: { status: err.response.status, msg: err.response.statusText }
		});
	}
};

export const createTask = text => async dispatch => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = {
			text
		};

		const res = await axios.post('/api/tasks', body, config);

		dispatch({
			type: CREATE_TASK,
			payload: res.data.task
		});
	} catch (err) {
		console.error(err.message);
		dispatch({
			type: TASK_ERROR,
			payload: { status: err.response.status, msg: err.response.statusText }
		});
	}
};

export const deleteTask = taskId => async dispatch => {
	try {
		await axios.delete(`/api/tasks/${taskId}`);

		dispatch({
			type: DELETE_TASK,
			payload: taskId
		});
	} catch (err) {
		console.error(err.message);
		dispatch({
			type: TASK_ERROR,
			payload: { status: err.response.status, msg: err.response.statusText }
		});
	}
};

export const toggleDoneTask = taskId => async dispatch => {
	try {
		const res = await axios.put(`/api/tasks/${taskId}`);

		dispatch({
			type: TOGGLE_DONE_TASK,
			payload: res.data
		});
		// console.log('done');
	} catch (err) {
		console.error(err.response.data.errors);
		dispatch({
			type: TASK_ERROR,
			payload: { status: err.response.status, msg: err.response.statusText }
		});
	}
};

export const clearTasks = () => dispatch => {
	dispatch({ type: CLEAR_TASKS });
};

const setLoading = () => dispatch => {
	dispatch({ type: SET_TASK_LOADING });
};
