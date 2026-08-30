const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    store_name: {
      type: String,
      required: true
    },

    store_location: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Retailer", retailerSchema);