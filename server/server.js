require('dotenv').config();
const mongoose = require('mongoose');

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
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

// Call in models 
require('./models/user');
require('./models/room');
require('./models/message');

app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`);});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});