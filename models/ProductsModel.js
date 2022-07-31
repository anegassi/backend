const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  _id: String,

  title: String,

  category: String,

  rating: Number,

  review: [String],

  price: Number,

  imageUrl: String,
});

module.exports = mongoose.model("Products", ProductsSchema);
