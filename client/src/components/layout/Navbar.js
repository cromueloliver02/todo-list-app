import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { user, loading } }) => {
	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-primary sticky-top py-2'>
			<div className='container'>
				<Link to='/dashboard' className='navbar-brand'>
					Todo List
				</Link>

				<button
					className='navbar-toggler'
					data-toggle='toggle'
					data-target='#navbar-menu'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div id='navbar-menu' className='collapse navbar-collapse'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link to='/dashboard' className='nav-link'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/about' className='nav-link'>
								About
							</Link>
						</li>
						{!loading && user && (
							<li className='nav-item'>
								<a
									href='#!'
									className='nav-link'
									data-toggle='modal'
									data-target='#confirmModal'
								>
									<i className='fas fa-sign-out-alt'></i> {user.name},
									Logout
								</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
