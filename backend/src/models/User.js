const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password_hash: {
      type: String,
      required: true
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);