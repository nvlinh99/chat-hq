require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || process.env.LOCAL_PORT;


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