// This function is called with next() and handles the error http response back to client.
// Check routes/pendingPropertyRoutes.js for some examples.
function errorHandler(err, req, res, next) {
  console.log(err);
  if (!err.status) {
    const internalError = internalErrorHandler(err);
    return res.status(500).send(internalError);
  }
  res.status(err.status || 500);
  return res.send(err);
}

// If the error is not a business exception, it is an internal error and should be logged and handled.
function internalErrorHandler(err) {
  loggerHandler(err);
  shouldEndProcess(err);

  return {
    success: false,
    msg: 'An internal server error has occurred. It has been logged and will be fixed as soon as possible.',
  };
}

// Check for errors that should end the process, such as out of memory, call stack size exceeded, etc.
function shouldEndProcess(err) {
  if (err instanceof RangeError) throw err;

  return;
}

// Log the error to the console. Later to log to a file or database.
function loggerHandler(err) {}

module.exports = errorHandler;
