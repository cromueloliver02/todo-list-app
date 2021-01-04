import React from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => {
	return (
		<img
			src={spinner}
			alt='Loading...'
			className='img-fluid d-block m-auto'
			style={{ width: '70px' }}
		/>
	);
};

export default Spinner;
