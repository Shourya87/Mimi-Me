const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 20,
            maxlength: 2000,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discountPrice: {
            type: Number,
            min: 0,
        },
        brand: {
            type: String,
            required: true,
            default: "Mimi & Me",
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Women", "Girls", "Babies"],
        },
        sizes: {
            type: [String],
            default: [],
        },
        colors: {
            type: [String],
            default: [],
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        images: {
            type: [String],
            required: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: [],
            min: 0,
            max: 5,
        },
    },
    {
    timestamps: true,
    },
);



const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
