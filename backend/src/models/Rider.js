const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    vehicle_type: {
      type: String,
      required: true
    },

    license_plate: {
      type: String,
      required: true
    },

    is_available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rider", riderSchema);