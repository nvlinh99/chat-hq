const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncHandler = require('express-async-handler');

const AppError = require('../utils/appError');

exports.authorize = asyncHandler(async (req, res, next) => {
  try {
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

    req.payload = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      status: 'fail',
      message: 'Forbidden 🚫🚫🚫',
    });
  }
});
