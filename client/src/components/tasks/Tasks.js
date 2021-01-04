import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../_actions/task';
import Spinner from '../layout/Spinner';
import TaskItem from '../tasks/TaskItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Tasks = ({ task: { tasks, loading }, getTasks }) => {
	useEffect(() => {
		getTasks();
		// eslint-disable-next-line
	}, []);

	if (loading && tasks.length === 0) {
		return <Spinner />;
	}

	return (
		<section className='todo-list py-3'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Todos</h4>
					<ul className='list-group'>
						<TransitionGroup>
							{tasks.length === 0 ? (
								<CSSTransition classNames='item' timeout={500}>
									<p className='text-muted'>No tasks now</p>
								</CSSTransition>
							) : (
								tasks.map(task => (
									<CSSTransition
										key={task._id}
										classNames='item'
										timeout={500}
									>
										<TaskItem task={task} />
									</CSSTransition>
								))
							)}
						</TransitionGroup>
					</ul>
				</div>
			</div>
		</section>
	);
};

Tasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	task: state.task
});

export default connect(mapStateToProps, { getTasks })(Tasks);
