import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Navbar from '../layout/Navbar';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Alert from '../layout/Alert';

const PrivateRoutes = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className='row pt-3'>
					<div className='col-md-6 offset-md-3'>
						<Alert />
					</div>
				</div>
				<Switch>
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/about' component={About} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default PrivateRoutes;
