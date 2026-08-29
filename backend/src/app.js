const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require(
  "./routes/authRoutes"
);

const deliveryRoutes = require(
  "./routes/deliveryRoutes"
);

const riderRoutes = require(
  "./routes/riderRoutes"
);

const errorHandler = require(
  "./middleware/errorHandler"
);

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/deliveries",
  deliveryRoutes
);

app.use(
  "/api/riders",
  riderRoutes
);

app.use(errorHandler);

module.exports = app;