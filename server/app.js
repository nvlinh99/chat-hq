const express = require('express');

const app = express();

const errorHandlers = require('./handlers/errorHandlers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup error handlers
app.use(errorHandlers.catchError);
app.use(errorHandlers.mongooseErrors);
if(process.env.NODE_ENV === "DEVELOPMENT") {
	app.use(errorHandlers.devErrors);
} else {
	app.use(errorHandlers.productionErrors);
}

module.exports = app;