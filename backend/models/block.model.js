import mongoose from "mongoose";
const blockSchema = new mongoose.Schema({
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true, index: true },
    type: { type: String, enum: ["text", "image", "list"], required: true },
    content: { type: String, default: "" },
    position: { type: Number, required: true, default: 0, index: true }, // 🔥 Default position
    createdAt: { type: Date, default: Date.now },
});

// 🔥 Automatically set position if not provided
blockSchema.pre("save", async function (next) {
    if (this.isNew && this.position === 0) {
        const lastBlock = await this.constructor.findOne({ page: this.page }).sort({ position: -1 });
        this.position = lastBlock ? lastBlock.position + 1 : 1;
    }
    next();
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
