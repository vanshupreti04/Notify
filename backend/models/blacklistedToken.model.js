import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, unique: true, index: true }, // ✅ Index for faster lookups
        createdAt: { type: Date, default: Date.now, expires: "1d" }, // ✅ Token auto-deletes after 24 hours
    }
);

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

export default BlacklistedToken;
