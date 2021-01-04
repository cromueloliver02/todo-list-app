import React from 'react';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-primary sticky-top py-2'>
			<div className='container'>
				<a href='dashboard.html' className='navbar-brand'>
					Todo List
				</a>

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
							<a href='dashboard.html' className='nav-link'>
								Home
							</a>
						</li>
						<li className='nav-item'>
							<a href='about.html' className='nav-link'>
								About
							</a>
						</li>
						<li className='nav-item'>
							<a
								href='#!'
								className='nav-link'
								data-toggle='modal'
								data-target='#confirmModal'
							>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
