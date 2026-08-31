const express = require("express");

const {
    updateDeliveryStatus,
    getDeliveryStatusHistory
} = require("../controllers/deliveryStatusController");

const router = express.Router();

// Update delivery status
router.post("/", updateDeliveryStatus);

// Get status history for a specific delivery
router.get("/:delivery_id", getDeliveryStatusHistory);

module.exports = router;