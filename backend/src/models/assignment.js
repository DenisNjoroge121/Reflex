const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        delivery_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        rider_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        dispatcher_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        assigned_at: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["Assigned", "Reassigned", "Cancelled"],
            default: "Assigned"
        },

        is_current: {
            type: Boolean,
            default: true
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Assignment", assignmentSchema);