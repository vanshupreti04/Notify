import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User model
    },
    { timestamps: true }
);

// ✅ Prevent OverwriteModelError by checking if model exists
const PageModel = mongoose.models.Page || mongoose.model("Page", PageSchema);
export default PageModel;
