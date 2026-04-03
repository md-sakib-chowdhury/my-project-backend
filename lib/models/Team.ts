import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    photo: { type: String },
    about: { type: String },
}, { timestamps: true });

export default mongoose.models.Team ||
    mongoose.model("Team", TeamSchema);