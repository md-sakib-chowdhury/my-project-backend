import mongoose from "mongoose";

const BuyingHouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    buyer: { type: String, required: true },
    country: { type: String },
    image: { type: String },
    status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.models.BuyingHouse ||
    mongoose.model("BuyingHouse", BuyingHouseSchema);