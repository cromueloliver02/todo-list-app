const mongoose = require('mongoose');
const config = require('config');

const dbURI =
	process.env.NODE_ENV === 'production'
		? config.get('mongoURI')
		: config.get('devMongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(dbURI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log(`MongoDB connected at ${dbURI}`);
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
