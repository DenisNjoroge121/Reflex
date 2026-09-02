const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const riderRoutes = require("./routes/riderRoutes");

const assignmentRoutes = require("./routes/assignmentRoutes");
const deliveryStatusRoutes = require("./routes/DeliveryStatusRoutes");
const proofOfDeliveryRoutes = require("./routes/proofofDeliveryRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/riders", riderRoutes);

// Part B routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/delivery-status", deliveryStatusRoutes);
app.use("/api/proof-of-delivery", proofOfDeliveryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Reflex Backend is running!"
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Reflex API is running!",
    endpoints: {
      auth: "/api/auth",
      deliveries: "/api/deliveries",
      riders: "/api/riders",
      assignments: "/api/assignments",
      deliveryStatus: "/api/delivery-status",
      proofOfDelivery: "/api/proof-of-delivery",
    },
  });
});

// Error handling
app.use(errorHandler);

module.exports = app;