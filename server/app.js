const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const GlobalAppError = require('./handlers/errorHandlers');
const AppError = require('./utils/appError');

const userRoute = require('./routes/user.route');

// Start express app
const app = express();
app.enable('trust proxy')

// Implement cors
app.use(cors());

app.use(express.json());

// Development logging request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello the world 😄😄😄!',
  });
});

// Routes
app.use('/user', userRoute);

// Ignore favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// Route not found
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle global error
app.use(GlobalAppError);

module.exports = app;