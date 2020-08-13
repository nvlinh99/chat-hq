const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	chatRoom: {
		type: mongoose.Schema.Types.ObjectId,
		required: "Chatroom is required!",
		ref: "room"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: "User is required!",
		ref: "user"
	},
	message: {
		type: String,
		required: "Message is required!"
	}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;