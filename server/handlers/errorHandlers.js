const AppError = require('../utils/appError');

// FOR HANDLE ERROR
const handleUniqueConstraintError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = errors.join('/');
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `${errors.join('/')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again!', 401);

// FOR RESPONSE
const resErrorDevelopment = (err, res) => {
  console.log('ERROR!!!', err);

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const resErrorProduction = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    resErrorDevelopment(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleUniqueConstraintError(error);
    if (error.name === 'SequelizeValidationError')
      error = handleValidationError(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    resErrorProduction(error, res);
  } else {
    return res
      .status(500)
      .json({ message: 'Missing environment!', error: err });
  }
};