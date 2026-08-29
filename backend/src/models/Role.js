const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Retailer", "Dispatcher", "Rider"]
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);