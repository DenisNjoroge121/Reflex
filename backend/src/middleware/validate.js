module.exports = (schema) => {
  return (req, res, next) => {
    console.log("BODY:", req.body);

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log("Validation Error:", error);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues || error.errors || error.message,
      });
    }
  };
};