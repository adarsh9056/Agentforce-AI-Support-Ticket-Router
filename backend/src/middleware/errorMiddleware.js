function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.name === "ZodError") {
    return res.status(400).json({
      message: "Validation failed.",
      issues: error.issues,
    });
  }
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
