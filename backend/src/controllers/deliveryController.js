const Delivery = require("../models/Delivery");
const DeliveryItem = require("../models/DeliveryItem");
const Customer = require("../models/Customer");
const Retailer = require("../models/Retailer");
const Rider = require("../models/Rider");

exports.createDelivery = async (req, res) => {
  try {
    const {
      customer_name,
      customer_phone,
      customer_address,
      pickup_location,
      dropoff_address,
      phone,
      instructions,
      items,
    } = req.body;

    const retailer = await Retailer.findOne({
      user: req.user.userId,
    });

    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer profile not found",
      });
    }

    const customer = await Customer.create({
      customer_name,
      customer_phone,
      customer_address,
    });

    const delivery = await Delivery.create({
      retailer: retailer._id,
      customer: customer._id,
      pickup_location,
      dropoff_address,
      phone,
      instructions,
      status: "Pending",
    });

    if (items && items.length > 0) {
      const deliveryItems = items.map((item) => ({
        delivery: delivery._id,
        item: item.item,
        quantity: item.quantity,
        unit_price: item.unit_price,
        notes: item.notes,
      }));

      await DeliveryItem.insertMany(deliveryItems);
    }

    res.status(201).json({
      success: true,
      message: "Delivery created successfully",
      delivery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDeliveries = async (req, res) => {
  try {
    let deliveries;

    if (req.user.role === "Retailer") {
      const retailer = await Retailer.findOne({
        user: req.user.userId,
      });

      if (!retailer) {
        return res.status(404).json({
          success: false,
          message: "Retailer profile not found",
        });
      }

      deliveries = await Delivery.find({
        retailer: retailer._id,
      })
        .populate("customer")
        .populate("rider")
        .sort({ createdAt: -1 });
    } else {
      deliveries = await Delivery.find()
        .populate("customer")
        .populate("retailer")
        .populate("rider")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: deliveries.length,
      deliveries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(
      req.params.id
    )
      .populate("customer")
      .populate("retailer")
      .populate("rider");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    const items = await DeliveryItem.find({
      delivery: delivery._id,
    });

    res.status(200).json({
      success: true,
      delivery,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAvailableRiders = async (req, res) => {
  try {
    const riders = await Rider.find({
      is_available: true,
    }).populate(
      "user",
      "full_name phone email"
    );

    res.status(200).json({
      success: true,
      riders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.assignDelivery = async (req, res) => {
  try {
    const { rider_id } = req.body;

    if (!rider_id) {
      return res.status(400).json({
        success: false,
        message: "rider_id is required",
      });
    }

    const delivery = await Delivery.findById(
      req.params.id
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    if (delivery.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending deliveries can be assigned",
      });
    }

    const rider = await Rider.findById(rider_id);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    if (!rider.is_available) {
      return res.status(400).json({
        success: false,
        message: "Rider is not available",
      });
    }

    delivery.rider = rider._id;
    delivery.status = "Assigned";

    await delivery.save();

    rider.is_available = false;

    await rider.save();

    const updatedDelivery = await Delivery.findById(
      delivery._id
    )
      .populate("customer")
      .populate("retailer")
      .populate("rider");

    res.status(200).json({
      success: true,
      message: "Delivery assigned successfully",
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
 * GET RIDER DELIVERIES
 *
 * Returns only deliveries assigned to
 * the currently logged-in rider.
 */
exports.getRiderDeliveries = async (req, res) => {
  try {
    const rider = await Rider.findOne({
      user: req.user.userId,
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider profile not found",
      });
    }

    const deliveries = await Delivery.find({
      rider: rider._id,
    })
      .populate("customer")
      .populate("retailer")
      .populate("rider")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      deliveries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
 * UPDATE RIDER DELIVERY STATUS
 *
 * Allowed progression:
 *
 * Assigned
 *     ↓
 * Picked Up
 *     ↓
 * Out for Delivery
 *     ↓
 * Delivered
 */
exports.updateRiderDeliveryStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Picked Up",
      "Out for Delivery",
      "Delivered",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Riders can only set Picked Up, Out for Delivery, or Delivered",
      });
    }

    const rider = await Rider.findOne({
      user: req.user.userId,
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider profile not found",
      });
    }

    const delivery = await Delivery.findOne({
      _id: req.params.id,
      rider: rider._id,
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message:
          "Delivery not found or not assigned to you",
      });
    }

    const validTransitions = {
      Assigned: ["Picked Up"],
      "Picked Up": ["Out for Delivery"],
      "Out for Delivery": ["Delivered"],
    };

    const currentStatus = delivery.status;

    if (
      !validTransitions[currentStatus] ||
      !validTransitions[currentStatus].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Cannot change delivery status from "${currentStatus}" to "${status}"`,
      });
    }

    delivery.status = status;

    await delivery.save();

    if (status === "Delivered") {
      rider.is_available = true;
      await rider.save();
    }

    const updatedDelivery = await Delivery.findById(
      delivery._id
    )
      .populate("customer")
      .populate("retailer")
      .populate("rider");

    res.status(200).json({
      success: true,
      message: `Delivery status updated to ${status}`,
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.cancelDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(
      req.params.id
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    if (delivery.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message:
          "Delivered deliveries cannot be cancelled",
      });
    }

    if (delivery.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Delivery is already cancelled",
      });
    }

    const assignedRider = delivery.rider;

    delivery.status = "Cancelled";
    delivery.rider = null;

    await delivery.save();

    if (assignedRider) {
      await Rider.findByIdAndUpdate(
        assignedRider,
        { is_available: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Delivery cancelled successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.trackDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id)
      .populate("customer")
      .populate("retailer");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.status(200).json({
      success: true,
      tracking: {
        delivery_id: delivery._id,
        status: delivery.status,
        pickup_location: delivery.pickup_location,
        dropoff_address: delivery.dropoff_address,
        customer: delivery.customer,
        created_at: delivery.createdAt,
        updated_at: delivery.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
