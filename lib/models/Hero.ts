import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    bannerImage: { type: String },
    stats: [{
        label: String,
        value: String,
    }],
}, { timestamps: true });

export default mongoose.models.Hero ||
    mongoose.model("Hero", HeroSchema);