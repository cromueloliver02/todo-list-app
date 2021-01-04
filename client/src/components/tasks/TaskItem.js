import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, toggleDoneTask } from '../../_actions/task';
import PropTypes from 'prop-types';

const TaskItem = ({ task, deleteTask, toggleDoneTask }) => {
	return (
		<li className='todo-item list-group-item d-flex'>
			<input
				type='checkbox'
				className='checkbox mr-3 mt-1'
				checked={task.isDone}
				onChange={() => toggleDoneTask(task._id)}
			/>
			<div className='mr-4'>
				<span>{task.text}</span>
			</div>
			<div className='ml-auto'>
				<i
					className='fas fa-trash text-danger mb-2 btn-delete'
					onClick={() => deleteTask(task._id)}
				></i>
			</div>
		</li>
	);
};

TaskItem.propTypes = {
	task: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	toggleDoneTask: PropTypes.func.isRequired
};

export default connect(null, { deleteTask, toggleDoneTask })(TaskItem);
