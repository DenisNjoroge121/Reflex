const Assignment = require("../models/Assignment");

// Assign a rider to a delivery
const createAssignment = async (req, res) => {
    try {
        const {
            delivery_id,
            rider_id,
            dispatcher_id,
            notes
        } = req.body;

        // Check required fields
        if (!delivery_id || !rider_id || !dispatcher_id) {
            return res.status(400).json({
                message: "delivery_id, rider_id and dispatcher_id are required"
            });
        }

        // Create assignment
        const assignment = await Assignment.create({
            delivery_id,
            rider_id,
            dispatcher_id,
            notes
        });

        //send real-time update
        const io = req.app.get("io");

        io.emit("assignmentCreated", {
            message: "A rider has been assigned", assignment
        });

        res.status(201).json({
            message: "Rider assigned successfully",
            assignment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating assignment",
            error: error.message
        });
    }
};


// Get all assignments
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .sort({ createdAt: -1 });

        res.status(200).json(assignments);

    } catch (error) {
        res.status(500).json({
            message: "Error getting assignments",
            error: error.message
        });
    }
};



// Reassign a delivery to another rider
const reassignDelivery = async (req, res) => {
    try {
        const { delivery_id, new_rider_id, dispatcher_id, notes } = req.body;

        // Check required fields
        if (!delivery_id || !new_rider_id || !dispatcher_id) {
            return res.status(400).json({
                message: "delivery_id, new_rider_id and dispatcher_id are required"
            });
        }

        // Find the current assignment
        const currentAssignment = await Assignment.findOne({
            delivery_id,
            is_current: true
        });

        if (!currentAssignment) {
            return res.status(404).json({
                message: "Current assignment not found"
            });
        }

        // Mark the old assignment as no longer current
        currentAssignment.is_current = false;
        currentAssignment.status = "Reassigned";

        await currentAssignment.save();

        // Create a new assignment for the new rider
        const newAssignment = await Assignment.create({
            delivery_id,
            rider_id: new_rider_id,
            dispatcher_id,
            notes,
            status: "Assigned",
            is_current: true
        });

        res.status(201).json({
            message: "Delivery reassigned successfully",
            previousAssignment: currentAssignment,
            newAssignment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error reassigning delivery",
            error: error.message
        });
    }
}
module.exports = {
    createAssignment,
    getAssignments,
    reassignDelivery
};

