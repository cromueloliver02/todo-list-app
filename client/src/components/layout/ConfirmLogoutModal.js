import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../_actions/auth';
import PropTypes from 'prop-types';

const ConfirmLogoutModal = ({ logout }) => {
	return (
		<div className='modal' id='confirmModal'>
			<div className='modal-dialog modal-sm modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header bg-primary text-white'>
						<h6 className='modal-title'>Confirm Logout</h6>
					</div>
					<div className='modal-body'>
						<p>Are you sure you wanna logout?</p>
					</div>
					<div className='modal-footer'>
						<div className='m-auto'>
							<button
								type='button'
								className='btn btn-secondary btn-sm'
								data-dismiss='modal'
							>
								No
							</button>
							<button
								type='button'
								className='btn btn-danger btn-sm ml-2'
								onClick={() => logout()}
								data-dismiss='modal'
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ConfirmLogoutModal.propTypes = {
	logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(ConfirmLogoutModal);
