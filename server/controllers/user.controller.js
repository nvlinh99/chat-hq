const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

const User = mongoose.model('User');

const AppError = require('../utils/appError');

exports.register = asyncHandler(async(req, res, next) => {
	const { name, email, password } = req.body;
	const emailRegex = /[@gmail.com|@yahoo.com|@live.com|@outlook.com]$/;
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
	
	const userExist = User.findOne({ email });
	if(userExist) {
		return next(new AppError('User is already existed.', 400));
	}

	const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
	});
	
	await user.save();

	return res.status(200).json({
		status: 'success',
		message: "User [" + name + "] registered successfully!",
	})
});