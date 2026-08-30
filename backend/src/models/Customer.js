const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true
    },

    customer_phone: {
      type: String,
      required: true
    },

    customer_address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);