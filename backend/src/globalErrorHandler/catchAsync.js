// This can be used to wrap routes in a try catch block instead of writing the try catch block inside the function.
// It will pass the error to the errorHandler when an error is thrown anywhere.

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
