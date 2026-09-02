const express = require("express");

const {
  updateDeliveryStatus,
  getDeliveryStatusHistory,
} = require("../controllers/DeliveryStatusController");

const router = express.Router();

router.post("/", updateDeliveryStatus);

router.get("/:delivery_id", getDeliveryStatusHistory);

module.exports = router;