// This is used because the default error displayed will be in html format
// to convert that errror message to readable format we use error handler
// we convert the error to json and pass it to our server
const constant = require("../constants");
const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  switch (status) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constant.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constant.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constant.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("NO error all good");
      break;
  }
};

module.exports = errorHandler;
