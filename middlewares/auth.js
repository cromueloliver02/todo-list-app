const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	try {
		const token = req.header('x-auth-token');

		if (!token) {
			return res
				.status(401)
				.json({ errors: [{ msg: 'No token, authorization denied' }] });
		}

		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;

		next();
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res
				.status(401)
				.json({ errors: [{ msg: 'Invalid token, authorization denied' }] });
		}

		console.error(`@decoded at auth middleware ${err.message}`);
		res.status(500).send('Server error');
	}
};
