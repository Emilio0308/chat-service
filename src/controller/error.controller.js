const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //   if (err.isOperational) {
  //   res.status(err.statusCode).json({
  //     status: err.status,
  //     message: err.message,
  //   });
  //   } else {
  // console.error('ERROR 🧨', err);
  // res.status(500).json({
  //   status: 'fail',
  //   message: 'Something went very wrong!',
  // });
  //   }
  if (!err.isOperational) {
    console.error("ERROR 🧨", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (!error.parent?.code) {
      error = err;
    }

    /* valid errors */

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
