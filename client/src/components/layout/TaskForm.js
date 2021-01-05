import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../_actions/alert';
import { createTask } from '../../_actions/task';
import PropTypes from 'prop-types';

const TaskForm = ({ setAlert, createTask }) => {
	const [text, setText] = useState('');

	const onSubmit = e => {
		if (text === '') {
			setAlert('Please enter you task', 'danger');
		} else {
			createTask(text);

			setText('');
		}

		e.preventDefault();
	};

	return (
		<section className='todo-form py-4'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						<form onSubmit={onSubmit}>
							<div className='form-group'>
								<div className='input-group mb-3'>
									<input
										type='text'
										className='form-control'
										placeholder='Enter your task...'
										name='text'
										value={text}
										onChange={e => setText(e.target.value)}
									/>
									<div className='input-group-append'>
										<button className='btn btn-primary' type='submit'>
											Add todo
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

TaskForm.propTypes = {
	setAlert: PropTypes.func.isRequired,
	createTask: PropTypes.func.isRequired
};

export default connect(null, { setAlert, createTask })(TaskForm);
