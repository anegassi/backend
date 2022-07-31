const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const Protect = require("../middlewares/protect");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.use(Protect.protect); //Global middleware check authorization
router.put("/:user_id", UserController.updateUserById);
router.get("/:user_id", UserController.getUserById);

module.exports = router;
