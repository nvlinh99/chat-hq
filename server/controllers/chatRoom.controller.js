const asyncHandler = require('express-async-handler');

const AppError = require('../utils/appError');

const ChatRoom = require('../models/chatRoom');

exports.createChatRoom = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const nameRegex = /^[A-Za-z\s]+$/;

  const validName = nameRegex.exec(name);
  if (!validName) {
    return next(
      new AppError('Chat room name can contain only alphabets.', 400)
    );
  }

  const nameExist = await ChatRoom.findOne({ name }).exec();
  if (nameExist) {
    return next(new AppError('Chat room with that name already exists!', 400));
  }

  const chatRoom = new ChatRoom({ name });
  await chatRoom.save();

  return res.status(201).json({
    status: 'success',
    message: 'Chatroom created!',
  });
});

exports.getAllChatroom = asyncHandler(async (req, res, next) => {
  const chatroom = await ChatRoom.find().exec();
  return res.json({
    items: chatroom,
  });
});
