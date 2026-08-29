const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const authorize = require(
  "../middleware/roleMiddleware"
);

const {
  getAvailableRiders,
} = require(
  "../controllers/deliveryController"
);

router.get(
  "/available",
  authMiddleware,
  authorize("Dispatcher"),
  getAvailableRiders
);

module.exports = router;