const mongoose = require("mongoose");

const proofOfDeliverySchema = new mongoose.Schema(
    {
        delivery_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            index: true
        },

        rider_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        receiver_name: {
            type: String,
            required: true,
            trim: true
        },

        photo_url: {
            type: String
        },

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        delivered_at: {
            type: Date,
            default: Date.now
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

module.exports = mongoose.model(
    "ProofOfDelivery",
    proofOfDeliverySchema
);