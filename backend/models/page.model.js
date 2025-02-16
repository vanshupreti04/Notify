import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Block" }], // 🔥 Link to blocks
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User model
    },
    { timestamps: true }
);

// ✅ Prevent OverwriteModelError by checking if model exists
const PageModel = mongoose.models.Page || mongoose.model("Page", PageSchema);
export default PageModel;
