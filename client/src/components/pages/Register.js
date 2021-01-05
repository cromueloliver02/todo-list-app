import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../_actions/auth';
import { setAlert } from '../../_actions/alert';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({
	auth: { isAuthenticated, loading },
	register,
	setAlert
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onRegister = e => {
		if (password !== password2) {
			setAlert("Passwords doesn't match", 'danger');
		} else {
			register(formData);

			setFormData({
				name: '',
				email: '',
				password: '',
				password2: ''
			});
		}

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
										<span className='text-primary'>REGISTER</span>
									</h1>
									<form onSubmit={onRegister}>
										<div className='form-group'>
											<input
												type='text'
												className='form-control'
												placeholder='Name...'
												name='name'
												value={name}
												onChange={onChange}
											/>
										</div>
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
										<div className='form-group'>
											<input
												type='password'
												className='form-control'
												placeholder='Confirm password...'
												name='password2'
												value={password2}
												onChange={onChange}
											/>
										</div>
										<button
											type='submit'
											className='btn btn-primary btn-block'
											disabled={loading}
										>
											{loading ? (
												<i className='fas fa-spinner fa-spin'></i>
											) : (
												<span>REGISTER</span>
											)}
										</button>
										<p className='mt-4 mb-0'>
											Already have account?{' '}
											<Link to='/login'>Login</Link>
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

Register.propTypes = {
	register: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { register, setAlert })(Register);
