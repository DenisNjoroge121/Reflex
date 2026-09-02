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

      deliveries = await Delivery.find({
        retailer: retailer._id,
      })
        .populate("customer")
        .sort({ createdAt: -1 });
    } else {
      deliveries = await Delivery.find()
        .populate("customer")
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
      .populate("retailer");

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
    });

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

    delivery.status = "Cancelled";

    await delivery.save();

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