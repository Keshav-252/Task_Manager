export default function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || err.status || 500;

  if (err.name === "ZodError") {
    return res.status(400).json({ status: false, message: err.errors?.[0]?.message || "Validation error" });
  }

  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(400).json({ status: false, message: err.message || "Invalid input" });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ status: false, message: "Authentication error" });
  }

  const message = err.message || "Internal Server Error";
  res.status(status).json({ status: false, message });
}