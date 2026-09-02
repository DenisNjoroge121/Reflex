const DeliveryStatusHistory = require("../models/DeliveryStatusHistory");

// Create a new delivery status update
const updateDeliveryStatus = async (req, res) => {
    try {
        const {
            delivery_id,
            rider_id,
            updated_by,
            status,
            latitude,
            longitude,
            remarks
        } = req.body;

        // Check required fields
        if (!delivery_id || !updated_by || !status) {
            return res.status(400).json({
                message: "delivery_id, updated_by and status are required"
            });
        }

        // Save status history
        const statusUpdate = await DeliveryStatusHistory.create({
            delivery_id,
            rider_id,
            updated_by,
            status,
            latitude,
            longitude,
            remarks
        });

        //send real-time update
        const io = req.app.get("io");

        io.emit("deliveryStatusUpdate", {
            message: "Delivery status has been updated",
            statusUpdate
        });

        res.status(201).json({
            message: "Delivery status updated successfully",
            statusUpdate
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating delivery status",
            error: error.message
        });
    }
};


// Get status history for one delivery
const getDeliveryStatusHistory = async (req, res) => {
    try {
        const { delivery_id } = req.params;

        const history = await DeliveryStatusHistory.find({
            delivery_id
        }).sort({ updated_at: 1 });

        res.status(200).json(history);

    } catch (error) {
        res.status(500).json({
            message: "Error getting delivery status history",
            error: error.message
        });
    }
};


module.exports = {
    updateDeliveryStatus,
    getDeliveryStatusHistory
};