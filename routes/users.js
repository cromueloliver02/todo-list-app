const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// model
const User = require('../model/User');

// @route      POST /api/users
// @desc       Register user
// @access     Public
router.post(
	'/',
	[
		body('name', 'Please enter your name').not().isEmpty(),
		body('email', 'Please your valid email').isEmail(),
		body(
			'password',
			'Please enter a password with atleast 6 characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Email is already taken' }] });
			}

			user = new User({ name, email, password });

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			await user.save();

			const payload = {
				user: {
					id: user._id
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
