import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true, index: true }, // ✅ Indexed for fast lookup
    type: { type: String, enum: ["text", "image", "list"], required: true },
    content: { type: String, default: "" },
    position: { type: Number, required: true, index: true }, // ✅ Indexed for sorting
    createdAt: { type: Date, default: Date.now },
});

// ✅ Automatically sort blocks based on position when fetched
blockSchema.pre("find", function () {
    this.sort({ position: 1 });
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
