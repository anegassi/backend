const Products = require("../models/ProductsModel");
//const multer = require("multer");
//const path = require("path");
const { title } = require("process");

exports.addProducts = async (req, res) => {
  //console.log(req.body);
  const result = await Products.create(req.body);
  res.json({ success: true, data: result });
};
exports.getAllProducts = async (req, res) => {
  const result = await Products.find().exec();

  res.json({ success: true, data: result });
};

exports.deleteProductById = async (req, res) => {
  const result = await Products.deleteOne({ _id: req.params.product_id });
  res.json({ success: true, data: result });
};
exports.updateProductById = async (req, res) => {
  const result = await Products.updateOne(
    { _id: req.params.product_id },
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
      },
    }
  );
  res.json({ success: true, data: result });
};
exports.getProductById = async (req, res) => {
  const result = await Products.findOne({ _id: req.params.product_id });
  res.json({ success: true, data: result });
};
