/* eslint-disable */
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const app = require('./app');

const PORT = process.env.PORT || process.env.LOCAL_PORT;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

// Call in models
require('./models/user');
require('./models/chatRoom');
require('./models/message');


const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
const io = require('socket.io')(server);
const Message = require('./models/message');
const User = require('./models/user');

io.use(async (socket, next) => {
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      const { token } = socket.handshake.query;
      // Verify token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      socket.userId = decoded.id;
      next();
    }
  } catch (err) {
    next(new Error('Error'));
  }
})

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.userId}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.userId}`);
	});
	
	socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatRoom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
