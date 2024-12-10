export const errorHandler = (req, res, err, next) => {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ success: false, message: "Validation failed", error: err });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError")
    return res.status(401).json({ success: false, message: "Invalid Token" });

  // Handle any other errors (generic 500 Internal Server Error)
  return res.status(500).json({
    success: false,
    message: err || "Hmmm Something went wrong!",
  });
};


