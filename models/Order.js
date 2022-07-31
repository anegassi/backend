const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  _id: String,

  orderNumber: String,

  userId: String,
  fullname: String,

  products: [
    {
      productId: String,
      quantity: Number,
      price: Number,
    },
  ],

  totalPrice: Number,

  email: String,

  address: {},

  status: String,

  paymentMethod: {},

  date: Date,
});

module.exports = mongoose.model("Orders", OrdersSchema);
