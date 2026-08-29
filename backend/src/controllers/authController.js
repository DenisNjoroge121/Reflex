const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Retailer = require("../models/Retailer");
const Dispatcher = require("../models/Dispatcher");
const Rider = require("../models/Rider");


const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.roleName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      email,
      password,
      role,

      // Retailer
      store_name,
      store_location,

      // Dispatcher
      department,

      // Rider
      vehicle_type,
      license_plate,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const roleDoc = await Role.findOne({
      role_name: role,
    });

    if (!roleDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      full_name,
      phone,
      email,
      password_hash: hashedPassword,
      role: roleDoc._id,
      is_active: true,
    });

    if (role === "Retailer") {
      await Retailer.create({
        user: user._id,
        store_name,
        store_location,
      });
    }

    if (role === "Dispatcher") {
      await Dispatcher.create({
        user: user._id,
        department,
      });
    }

    if (role === "Rider") {
      await Rider.create({
        user: user._id,
        vehicle_type,
        license_plate,
      });
    }

    return res.status(201).json({
      success: true,
      message: `${role} registered successfully`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role.role_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES || "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role.role_name,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};