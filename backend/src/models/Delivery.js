const mongoose = require("mongoose");

const DELIVERY_STATUS = [
  "Pending",
  "Assigned",
  "Picked Up",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const deliverySchema = new mongoose.Schema(
  {
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      default: null
    },

    pickup_location: {
      type: String,
      required: true
    },

    dropoff_address: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    instructions: {
      type: String
    },

    status: {
      type: String,
      enum: DELIVERY_STATUS,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
