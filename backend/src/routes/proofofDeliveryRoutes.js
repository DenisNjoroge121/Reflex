const express = require("express");

const {
  createProofOfDelivery,
  getProofOfDelivery,
} = require("../controllers/ProofofDeliveryController");

const router = express.Router();

router.post("/", createProofOfDelivery);

router.get("/:delivery_id", getProofOfDelivery);

module.exports = router;