const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncHandler = require('express-async-handler');

const AppError = require('../utils/appError');
const User = require('../models/user');

exports.authorize = asyncHandler(async (req, res, next) => {
  // Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check user exists
  let currentUser = null;
  switch (decoded.type) {
    case 'user':
      currentUser = await User.findOne({ where: { email: decoded.email } });
      break;
    default:
  }

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exists.',
        401
      )
    );
  }
  // GRANT ACCESS
  req.user = currentUser;
  next();
});
