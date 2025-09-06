const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "an Error aquired in the server",
    });
  };

  module.exports = errorHandler;
  