const express = require("express");

const {
    createProofOfDelivery,
    getProofOfDelivery
} = require("../controllers/proofOfDeliveryController");

const router = express.Router();

// Create Proof of Delivery
router.post("/", createProofOfDelivery);

// Get Proof of Delivery for a delivery
router.get("/:delivery_id", getProofOfDelivery);

module.exports = router;