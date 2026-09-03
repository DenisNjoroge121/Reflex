const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const authorize = require(
  "../middleware/roleMiddleware"
);

const validate = require(
  "../middleware/validate"
);

const {
  deliverySchema,
} = require(
  "../validators/deliveryValidator"
);

const {
  createDelivery,
  getDeliveries,
  getDeliveryById,
  getAvailableRiders,
  assignDelivery,
  cancelDelivery,
  trackDelivery,
  updateRiderDeliveryStatus,
} = require("../controllers/deliveryController");

router.post(
  "/",
  authMiddleware,
  authorize("Retailer"),
  validate(deliverySchema),
  createDelivery
);

router.get(
  "/",
  authMiddleware,
  getDeliveries
);

router.get(
  "/riders/available",
  authMiddleware,
  authorize("Dispatcher"),
  getAvailableRiders
);

router.get("/track/:id", trackDelivery);

router.get(
  "/:id",
  authMiddleware,
  getDeliveryById
);

router.patch(
  "/:id/assign",
  authMiddleware,
  authorize("Dispatcher"),
  assignDelivery
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelDelivery
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorize("Rider"),
  updateRiderDeliveryStatus
);

module.exports = router;
