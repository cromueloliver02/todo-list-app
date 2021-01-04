import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../_actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Login = ({ auth: { isAuthenticated, loading }, login }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onLogin = e => {
		login(formData);

		setFormData({
			email: '',
			password: ''
		});

		e.preventDefault();
	};

	if (!loading && isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<header className='landing'>
			<div className='overlay'>
				<div className='container'>
					<div className='landing-content pt-5'>
						<div className='row'>
							<div className='col-md-6 offset-md-3'>
								<div className='card card-body'>
									<Alert />
									<h1 className='mb-3'>
										<span className='text-primary'>LOGIN</span>
									</h1>
									<form onSubmit={onLogin}>
										<div className='form-group'>
											<input
												type='email'
												className='form-control'
												placeholder='Email...'
												name='email'
												value={email}
												onChange={onChange}
											/>
										</div>
										<div className='form-group'>
											<input
												type='password'
												className='form-control'
												placeholder='Password...'
												name='password'
												value={password}
												onChange={onChange}
											/>
										</div>
										<button
											type='submit'
											className='btn btn-primary btn-block'
										>
											LOGIN
										</button>
										<p className='mt-4 mb-0'>
											Not registered yet?{' '}
											<Link to='/register'>Register</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
