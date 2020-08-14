const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: "Name is required!"
	}
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;