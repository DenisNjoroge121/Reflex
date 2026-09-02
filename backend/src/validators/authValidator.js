const { z } = require("zod");

exports.registerSchema = z.object({
  full_name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Retailer", "Dispatcher", "Rider"]),

  // Retailer
  store_name: z.string().optional(),
  store_location: z.string().optional(),

  // Dispatcher
  department: z.string().optional(),

  // Rider
  vehicle_type: z.string().optional(),
  license_plate: z.string().optional(),
});

exports.loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});