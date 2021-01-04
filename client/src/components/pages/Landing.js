import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { isAuthenticated, loading } }) => {
	if (!loading && isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<header className='landing'>
			<div className='overlay'>
				<div className='container'>
					<div className='landing-content pt-5'>
						<h1 className='display-3 my-5'>
							<span className='text-primary'>
								<i className='fas fa-pencil-alt'></i> Todo
							</span>
							List
						</h1>
						<p className='lead mb-4'>
							Work your way to success with great time management using
							Todo List
						</p>
						<Link to='/login' className='btn btn-primary'>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
