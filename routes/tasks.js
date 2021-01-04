const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// model
const Task = require('../model/Task');

// middleware
const auth = require('../middlewares/auth');

// @route      GET /api/tasks
// @desc       Get all user's tasks
// @access     Private
router.get('/', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });

		res.send(tasks);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route      POST /api/tasks
// @desc       Create task
// @access     Private
router.post(
	'/',
	[auth, [body('text', 'Please enter your task').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { text } = req.body;

		try {
			const task = new Task({ user: req.user.id, text });

			await task.save();

			res.json({ task });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route      DELETE /api/tasks/:tasks_id
// @desc       Delete task
// @access     Private
router.delete('/:task_id', auth, async (req, res) => {
	try {
		const task = await Task.findById(req.params.task_id);
		if (!task) {
			return res.status(400).json({ errors: [{ msg: 'Task not found' }] });
		}

		if (task.user.toString() !== req.user.id) {
			return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
		}

		await task.remove();

		res.send('Task removed');
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'Task not found' }] });
		}

		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route      POST /api/tasks/:task_id
// @desc       Update task
// @access     Private
router.post(
	'/:task_id',
	[auth, [body('text', 'Please enter your task').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const task = await Task.findById(req.params.task_id);
			if (!task) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Task not found' }] });
			}

			if (task.user.toString() !== req.user.id) {
				return res
					.status(401)
					.json({ errors: [{ msg: 'Not authorized' }] });
			}

			const { text } = req.body;

			task.text = text;

			await task.save();

			res.send(task);
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Task not found' }] });
			}

			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route      PUT /api/tasks
// @desc       Mark task as done
// @access     Private
router.put('/:task_id', auth, async (req, res) => {
	try {
		const task = await Task.findById(req.params.task_id);
		if (!task) {
			return res.status(400).json({ errors: [{ msg: 'Task not found' }] });
		}

		if (task.user.toString() !== req.user.id) {
			return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
		}

		task.isDone = !task.isDone;

		await task.save();

		res.send(task);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'Task not found' }] });
		}

		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
