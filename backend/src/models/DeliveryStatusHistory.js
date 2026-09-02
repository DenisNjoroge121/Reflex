const mongoose = require("mongoose");

const deliveryStatusHistorySchema = new mongoose.Schema(
    {
        delivery_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        rider_id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true
        },

        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Assigned",
                "Picked Up",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ],
            required: true
        },

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        remarks: {
            type: String,
            trim: true
        },

        updated_at: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "DeliveryStatusHistory",
    deliveryStatusHistorySchema
);