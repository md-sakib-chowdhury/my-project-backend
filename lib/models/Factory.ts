// import mongoose from "mongoose";

// const FactorySchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     location: { type: String, required: true },
//     capacity: { type: Number },
//     machinery: { type: String },
//     image: { type: String },
//     status: { type: String, default: "active" },
// }, { timestamps: true });

// export default mongoose.models.Factory ||
//     mongoose.model("Factory", FactorySchema);

import mongoose from "mongoose";

const MachineryItemSchema = new mongoose.Schema({
    sl: { type: String },
    name: { type: String },
    brand: { type: String },
    qty: { type: String },
});

const FactorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number },
    machineryType: { type: String }, // "cutting", "sewing" etc
    image: { type: String },
    label: { type: String }, // "NEEDLE DETECTOR MACHINE" etc
    inventoryItems: [MachineryItemSchema], // table এর জন্য
    status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.models.Factory ||
    mongoose.model("Factory", FactorySchema);