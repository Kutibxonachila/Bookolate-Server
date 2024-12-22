export const errorHandler = (err, req, res, next) => {
  console.error("Error Handler:", err); // Log the error for debugging

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ success: false, message: "Validation failed", error: err });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError")
    return res.status(401).json({ success: false, message: "Invalid Token" });

  // Generic error handler
  return res.status(500).json({
    success: false,
    message: err.message || "Hmmm Something went wrong!",
  });
};
