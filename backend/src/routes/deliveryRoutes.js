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
  cancelDelivery,
} = require(
  "../controllers/deliveryController"
);

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

router.get(
  "/:id",
  authMiddleware,
  getDeliveryById
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelDelivery
);

module.exports = router;