const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true
    },

    item_description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);