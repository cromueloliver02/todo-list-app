import {
	GET_TASKS,
	CREATE_TASK,
	DELETE_TASK,
	TOGGLE_DONE_TASK,
	SET_TASK_LOADING,
	TASK_ERROR
} from '../_actions/types';

const initialState = {
	tasks: [],
	loading: false,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_TASKS:
			return {
				...state,
				tasks: payload,
				loading: false
			};
		case CREATE_TASK:
			return {
				...state,
				tasks: [payload, ...state.tasks],
				loading: false
			};
		case DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== payload),
				loading: false
			};
		case TOGGLE_DONE_TASK:
			return {
				...state,
				tasks: state.tasks.map(task =>
					task._id === payload._id ? payload : task
				)
			};
		case SET_TASK_LOADING:
			return {
				...state,
				loading: true
			};
		case TASK_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
};
