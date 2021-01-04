import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './bootstrap.css';
import './App.css';

import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
// import Alert from './components/layout/Alert';
import PrivateRoutes from './components/routing/PrivateRoutes';
import { loadUser } from './_actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
// redux
import store from './store';
import { Provider } from 'react-redux';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					{/* <Alert /> */}
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute component={PrivateRoutes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
