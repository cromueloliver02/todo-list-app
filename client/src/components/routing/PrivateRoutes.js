import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Navbar from '../layout/Navbar';
import Dashboard from '../pages/Dashboard';
import Alert from '../layout/Alert';

const PrivateRoutes = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className='container pt-3'>
					<Alert />
				</div>
				<Switch>
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default PrivateRoutes;
