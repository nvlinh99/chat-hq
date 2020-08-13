// Catch errors

exports.catchError = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(err => {
			if (typeof err === 'string') {
				res.status(400).json({ message: err });
			}
			else {
				next(err);
			}
		})
	};
};

// MongoDB Validation Error Handler

exports.mongooseErrors = (err, req, res, next) => {
	if (!err.errors) {
		return next(err);
	}

  const errorKeys = Object.keys(err.errors);
  let message = "";
	errorKeys.forEach((key) => (message += err.errors[key].message + ", "));

  message = message.substr(0, message.length - 2);

  res.status(400).json({
    message,
  });
}; 

//Development Error Handles 
exports.devErrors = (err, req, res, next) => {
	err.stack = err.stack || "";
	const errDetails = {
		message: err.message,
		status: err.status,
		stack: err.stack,
	};
	res.status( err.status || 500).json(errDetails);
};

// Production Error Handles
exports.productionErrors = (err, req, res, next) => {
	res.status(err.status || 500).json({
		error: "Internal Server Error",
	});
};

// Page Error
exports.notFound = (req, res, next) => {
	res.status(404).json({
		message: "Resource not found",
	});
}