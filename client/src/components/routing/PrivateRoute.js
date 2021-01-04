import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				!loading && !isAuthenticated ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

PrivateRoute.propType = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
