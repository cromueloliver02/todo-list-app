const express = require('express');
const config = require('config');
const connectDB = require('./config/db');

// connect to database
connectDB();

const app = express();

// enable req.body access
app.use(express.json({ extended: false }));

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected on port ${port}`));
