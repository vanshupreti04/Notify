import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false } // Hide password by default
});

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    next();
});

// ✅ Compare entered password with hashed password
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate JWT Token
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

export default mongoose.model("User", userSchema);
