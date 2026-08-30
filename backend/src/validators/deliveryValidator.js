const { z } = require("zod");

exports.deliverySchema = z.object({
  customer_name: z.string(),

  customer_phone: z.string(),

  customer_address: z.string(),

  pickup_location: z.string(),

  dropoff_address: z.string(),
});