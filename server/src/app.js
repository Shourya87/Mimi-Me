const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const categoryRoutes = require("./routes/category.route");
const wishlistRoutes = require("./routes/wishlist.route");
const cartRoutes = require("./routes/cart.route");




const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());





app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);


module.exports = app;

