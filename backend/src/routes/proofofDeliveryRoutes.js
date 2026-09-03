const express = require("express");

const router = express.Router();

const {
  createProofOfDelivery,
  getProofOfDelivery,
} = require("../controllers/ProofofDeliveryController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create proof of delivery - Rider only
router.post(
  "/",
  authMiddleware,
  authorize("Rider"),
  createProofOfDelivery
);

// Get proof of delivery - Authenticated users
router.get(
  "/:delivery_id",
  authMiddleware,
  getProofOfDelivery
);

module.exports = router;