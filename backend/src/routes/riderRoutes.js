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
  getRiderDeliveries,
  updateRiderDeliveryStatus,
} = require(
  "../controllers/deliveryController"
);

router.get(
  "/available",
  authMiddleware,
  authorize("Dispatcher"),
  getAvailableRiders
);

router.get(
  "/deliveries",
  authMiddleware,
  authorize("Rider"),
  getRiderDeliveries
);

router.patch(
  "/deliveries/:id/status",
  authMiddleware,
  authorize("Rider"),
  updateRiderDeliveryStatus
);

module.exports = router;
