const Order = require("../models/order.model");

const orderController = async (req, res) => {
    try {
        const user = req.user; 
        const { items, total } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "items are required" });
        }
        if (total === undefined || total === null) {
            return res.status(400).json({ message: "total is required" });
        }
        const order = await Order.create({
            user: user._id,
            items,
            total
        });
        res.status(201).json(order);
    } catch (err) {
        console.log("Order failed:", err.message);
        res.status(500).json({ message: "Order failed" });
    }
};
module.exports={
    orderController
}
