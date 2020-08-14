const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncHandler = require('express-async-handler');

const AppError = require('../utils/appError');
const passwordValidator = require('../utils/passwordValidator');
const User = require('../models/user');

const signToken = (type, id) => {
  return jwt.sign({ type, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /@gmail.com|@yahoo.com|@live.com|@outlook.com/;
  const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/gm;

  const validEmail = emailRegex.test(email);
  const validPassword = passwordRegex.exec(password);

  if (!validEmail) {
    return next(new AppError('Email is invalid!', 400));
  }

  if (!validPassword) {
    return next(
      new AppError(
        'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        400
      )
    );
  }

  const userExist = await User.findOne({ email: email }).exec();
  if (userExist) {
    return next(new AppError('User is already existed.', 400));
  }

  const user = new User({
    name,
    email: email.trim().toLowerCase(),
    password: await passwordValidator.createHashedPassword(password),
  });

  await user.save();

  // Create login token and send to client
  const token = signToken('customer', user._id);

  return res.status(201).json({
    status: 'success',
    message: `User [${name}] registered successfully!`,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({
    email,
  });

  if (
    !user ||
    !(await passwordValidator.verifyHashedPassword(password, user.password))
  ) {
    return next(new AppError('Incorrect email or password', 400));
  }

  // Create login token and send to client
  const token = signToken('user', user._id);

  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully!',
    token,
  });
});
