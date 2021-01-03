const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	text: {
		type: String,
		required: true
	},
	isDone: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('task', TaskSchema);
