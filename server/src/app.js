const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const categoryRoutes = require("./routes/category.route");
const wishlistRoutes = require("./routes/wishlist.route");
const cartRoutes = require("./routes/cart.route");
const orderRoutes = require("./routes/order.route");
const adminRoutes = require("./routes/admin.route");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

module.exports = app;
