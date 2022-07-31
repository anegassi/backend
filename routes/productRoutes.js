const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const Protect = require("../middlewares/protect");

router.get("/", ProductController.getAllProducts);

router.use(Protect.protect); //Global middleware check authorization
router.post("/", ProductController.addProducts);
router.put("/:product_id", ProductController.updateProductById);
router.get("/:product_id", ProductController.getProductById);
router.delete("/:product_id", ProductController.deleteProductById);

module.exports = router;
