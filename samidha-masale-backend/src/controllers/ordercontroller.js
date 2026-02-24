const Order = require("../models/order.model");
const razorpay = require("../config/razorpay");

const orderController = async (req, res) => {
  try {
    const user = req.user;
    const { items, total, paymentType } = req.body;
    const normalizedPaymentType = String(paymentType || "").toLowerCase().trim();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items are required" });
    }
    if (total === undefined || total === null || Number(total) <= 0) {
      return res.status(400).json({ message: "valid total is required" });
    }
    if (!["cod", "razorpay"].includes(normalizedPaymentType)) {
      return res.status(400).json({ message: "paymentType must be cod or razorpay" });
    }

    if (normalizedPaymentType === "cod") {
      const order = await Order.create({
        user: user._id,
        items,
        total,
        paymentType: "cod",
        paymentStatus: "pending",
        status: "placed",
      });

      return res.status(201).json({ success: true, order });
    }

    const order = await Order.create({
      user: user._id,
      items,
      total,
      paymentType: "razorpay",
      paymentStatus: "pending",
      status: "pending",
    });

    const paymentLink = await razorpay.paymentLink.create({
      amount: Math.round(Number(total) * 100),
      currency: "INR",
      description: `Payment for order ${order._id}`,
      reference_id: order._id.toString(),
      notes: { orderId: order._id.toString() },
      notify: { sms: false, email: false },
      reminder_enable: false,
    });

    order.razorpayPaymentLinkId = paymentLink.id;
    await order.save();

    return res.status(201).json({
      success: true,
      orderId: order._id,
      paymentType: "razorpay",
      paymentLinkId: paymentLink.id,
      paymentUrl: paymentLink.short_url,
    });
  } catch (err) {
    console.log("Order failed:", err.message);
    return res.status(500).json({ message: "Order failed" });
  }
};

module.exports = {
  orderController,
};
