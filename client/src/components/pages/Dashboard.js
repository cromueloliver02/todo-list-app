import React, { Fragment } from 'react';
import TaskForm from '../layout/TaskForm';
import Tasks from '../tasks/Tasks';

const Dashboard = () => {
	return (
		<Fragment>
			<TaskForm />
			<Tasks />
		</Fragment>
	);
};

export default Dashboard;
