const { z } = require("zod");

exports.registerSchema = z.object({
  full_name: z.string().min(3, "Name must be at least 3 characters"),

  phone: z.string().min(10, "Invalid phone number"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum([
    "Retailer",
    "Dispatcher",
    "Rider",
  ]),
});

exports.loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z.string().min(1),
});