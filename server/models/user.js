const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Name is required!'
	},
	email: {
		type: String,
		unique: true,
		required: 'Email is required!'
	},
	password: {
		type: String,
		required: 'Password is required!'
	}
}, {
	timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;