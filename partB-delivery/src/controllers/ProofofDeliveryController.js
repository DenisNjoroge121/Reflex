const ProofOfDelivery = require("../models/ProofOfDelivery");

// Create Proof of Delivery
const createProofOfDelivery = async (req, res) => {
    try {
        const {
            delivery_id,
            rider_id,
            receiver_name,
            photo_url,
            latitude,
            longitude,
            notes
        } = req.body;

        // Check required fields
        if (!delivery_id || !rider_id || !receiver_name) {
            return res.status(400).json({
                message: "delivery_id, rider_id and receiver_name are required"
            });
        }

        // Create Proof of Delivery
        const proof = await ProofOfDelivery.create({
            delivery_id,
            rider_id,
            receiver_name,
            photo_url,
            latitude,
            longitude,
            notes
        });

        // send real-time update
        const io = req.app.get("io");

        io.emit("proofofDeliveryCreated", {
            message:"proof o delivery has been created", proof
        });S

        res.status(201).json({
            message: "Proof of Delivery created successfully",
            proof
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating Proof of Delivery",
            error: error.message
        });
    }
};


// Get Proof of Delivery for a specific delivery
const getProofOfDelivery = async (req, res) => {
    try {
        const { delivery_id } = req.params;

        const proof = await ProofOfDelivery.findOne({
            delivery_id
        });

        if (!proof) {
            return res.status(404).json({
                message: "Proof of Delivery not found"
            });
        }

        res.status(200).json(proof);

    } catch (error) {
        res.status(500).json({
            message: "Error getting Proof of Delivery",
            error: error.message
        });
    }
};


module.exports = {
    createProofOfDelivery,
    getProofOfDelivery
};