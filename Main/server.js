const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/connection');
const apiRoutes = require('./routes/api');

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

// Generic error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

connectToDatabase(); // Use the function to connect to the database

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
