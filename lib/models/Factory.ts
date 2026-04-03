import mongoose from "mongoose";

const FactorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number },
    machinery: { type: String },
    image: { type: String },
    status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.models.Factory ||
    mongoose.model("Factory", FactorySchema);