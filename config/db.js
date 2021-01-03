const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log('MongoDB connected');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
