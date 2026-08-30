const express = require("express");

const {
    createAssignment,
    getAssignments, 
    reassignDelivery
} = require("../controllers/assignmentController");

const router = express.Router();

// Create a new assignment
router.post("/", createAssignment);

// Get all assignments
router.get("/", getAssignments);

// Create a new assignment
router.put("/reassign", reassignDelivery);

module.exports = router;