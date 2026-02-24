const crypto = require("crypto");
const Order = require("../models/order.model");

const getOrderIdFromEvent = (event) => {
  const payload = event.payload || {};

  return (
    payload.payment_link?.entity?.notes?.orderId ||
    payload.payment?.entity?.notes?.orderId ||
    payload.payment_link?.entity?.reference_id ||
    payload.payment?.entity?.notes?.reference_id ||
    null
  );
};

const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body; // Buffer (because express.raw)

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    const event = JSON.parse(body.toString("utf8"));
    const eventType = event.event;
    const orderId = getOrderIdFromEvent(event);

    if (!orderId) {
      return res.status(200).json({ success: true, message: "No order mapping found" });
    }

    if (eventType === "payment_link.paid" || eventType === "payment.captured") {
      const razorpayPaymentId =
        event.payload?.payment?.entity?.id || event.payload?.payment_link?.entity?.payment_id || null;

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
        status: "placed",
        razorpayPaymentId,
      });
    } else if (eventType === "payment.failed" || eventType === "payment_link.expired") {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Webhook error:", err.message);
    return res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
};

module.exports = { handleWebhook };
