require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || process.env.LOCAL_PORT;


mongoose
.connect(process.env.DB_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
}); 

app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`);});