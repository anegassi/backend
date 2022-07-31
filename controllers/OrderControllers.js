const Order = require("../models/Order");
//const multer = require("multer");
//const path = require("path");

exports.addOrder = async (req, res) => {
  //   const result = await Order.create(req.body);
  //   res.json({ success: true, data: result });
};
exports.getAllOrders = async (req, res) => {
  const result = await Order.find().exec();

  res.json({ success: true, data: result });
};

exports.deleteOrderById = async (req, res) => {
  const result = await Order.deleteOne({ _id: req.params.order_id });
  res.json({ success: true, data: result });
};
exports.updateOrderById = async (req, res) => {
  const result = await Order.updateOne(
    { _id: req.params.order_id },
    {
      $set: {
        status: req.body.status,
        email: req.body.email,
        date: req.body.date,
      },
    }
  );
  res.json({ success: true, data: result });
};
exports.getOrderById = async (req, res) => {
  const result = await Order.findOne({ _id: req.params.order_id });
  console.log(result, "this is the recent order");
  res.json({ success: true, data: result });
};

exports.getOrdersById = async (req, res) => {
  const result = await Order.find().exec();
  const filtered = result.filter(
    (order) => order.userId === req.params.user_id
  );

  res.json({ success: true, data: filtered });
};
