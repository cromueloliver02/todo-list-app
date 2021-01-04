import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => {
	return (
		// <TransitionGroup>
		// 	{alerts.length !== 0 && (
		// 		<Fragment>
		// 			<CSSTransition key={1} classNames='item' timeout={500}>
		// 				<div className={`alert alert-${alerts[0].type}`}>
		// 					<i className='fas fa-info-circle'></i> {alerts[0].msg}
		// 				</div>
		// 			</CSSTransition>
		// 		</Fragment>
		// 	)}
		// </TransitionGroup>
		<TransitionGroup>
			{alerts.length > 0 &&
				alerts.map((alert, idx) => (
					<CSSTransition key={idx} classNames='item' timeout={500}>
						<div className={`alert alert-${alert.type}`}>
							<i className='fas fa-info-circle'></i> {alert.msg}
						</div>
					</CSSTransition>
				))}
		</TransitionGroup>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
