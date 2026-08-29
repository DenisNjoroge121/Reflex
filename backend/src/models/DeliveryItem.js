const mongoose = require("mongoose");

const deliveryItemSchema = new mongoose.Schema(
  {
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    unit_price: {
      type: Number,
      required: true
    },

    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DeliveryItem",
  deliveryItemSchema
);