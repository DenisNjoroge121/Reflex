require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const assignmentRoutes = require("./routes/assignmentRoutes");
const deliveryStatusRoutes = require("./routes/deliveryStatusRoutes");
const proofOfDeliveryRoutes = require("./routes/proofOfDeliveryRoutes");
const { Server } = require("socket.io");

const errorHandler = require("./middleware/errorHandler");

const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    }
});
app.set("io", io);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/delivery-status", deliveryStatusRoutes);
app.use("/api/proof-of-delivery", proofOfDeliveryRoutes);

//error handling middleware
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Reflex Part B Backend is running!"
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Part B Delivery Management API",
        endpoints: {
            assignments: "/api/assignments",
            deliveryStatus: "/api/delivery-status",
            proofOfDelivery: "/api/proof-of-delivery"
        }
    });
});

connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});