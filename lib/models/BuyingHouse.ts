import mongoose from "mongoose";

const ProductItemSchema = new mongoose.Schema({
    name: { type: String },
    img: { type: String },
});

const SubcategorySchema = new mongoose.Schema({
    name: { type: String },
    items: [ProductItemSchema],
});

const BuyingHouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    buyer: { type: String, required: true },
    country: { type: String },
    status: { type: String, default: "active" },
    // Product Expertise
    category: { type: String }, // "knitwear" or "woven"
    subcategories: [SubcategorySchema],
}, { timestamps: true });

export default mongoose.models.BuyingHouse ||
    mongoose.model("BuyingHouse", BuyingHouseSchema);