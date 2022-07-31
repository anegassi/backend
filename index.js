const express = require("express");
require("dotenv").config(); ////line 1 for
// const stripe = require("stripe")(
//   "sk_test_51LQB5WJkzn6ogKocgbsdKxyqL8kfx4s81j4elrd6wCU8PmPPLfm9HJgeFEQqVDSopcVSqC1ryqzPzQdk3dHHvOzw00OkXzmTat###stripesecretkey###"
// );
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const multer = require("multer");
//const path = require("path");

const userRoutes = require("./routes/userRoutes");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

async function db() {
  const password = "Sophia18@";
  await mongoose.connect(
    `mongodb+srv://aradomnegassi1:${encodeURIComponent(
      password
    )}@cluster0.dg1io.mongodb.net/myFirstDatabase?authSource=admin`
  );
  console.log("connected to mongoose");
}

db().catch((err) => console.log(err));

const app = express();
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
const Order = require("./models/Order");

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body, "stripe request.body");
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.products.map((item) => {
        // console.log(item, "this is item");
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/order-success`,
      cancel_url: `${process.env.CLIENT_URL}/check-out`,
    });
    Order.create(req.body);
    res.json({ url: session.url, success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, console.log("listening on port 3000"));
