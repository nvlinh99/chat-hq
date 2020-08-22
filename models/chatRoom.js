const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
    },
  },
  { timestamps: true }
);

const chatRoom = mongoose.model('chatRoom', chatRoomSchema);

module.exports = chatRoom;
