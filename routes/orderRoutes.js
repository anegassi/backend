const express = require("express");
const OrderController = require("../controllers/OrderControllers");
const router = express.Router();
const Protect = require("../middlewares/protect");

//router.use(Protect.protect); //Global middleware check authorization
router.get("/", OrderController.getAllOrders);
// router.post("/", OrderController.addOrder);
// //router.use(Protect.protect); //Global middleware check authorization
router.put("/:order_id", OrderController.updateOrderById);
router.get("/:user_id", OrderController.getOrdersById);
router.get("/order/:order_id", OrderController.getOrderById);
router.delete("/:order_id", OrderController.deleteOrderById);

module.exports = router;
