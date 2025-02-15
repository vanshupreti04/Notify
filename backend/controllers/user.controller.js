import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import crypto from "crypto"; // ✅ Import crypto for manual hashing

// ✅ Manual Hash Function
const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

// ✅ User Registration Controller
export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const hashedPassword = hashPassword(password);
        const user = new userModel({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        const token = user.generateJWT();
        const { password: _, ...userResponse } = user.toObject();

        res.status(201).json({ user: userResponse, token });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Login Controller
export const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const hashedPassword = hashPassword(password);
        if (user.password !== hashedPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = user.generateJWT();
        const { password: _, ...userResponse } = user.toObject();

        res.status(200).json({ user: userResponse, token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get All Users Controller
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 }); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// ✅ Logout Controller
export const logoutController = async (req, res) => {
    try {
        // Optionally, implement token invalidation logic if using a token blacklist.
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("❌ Logout Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// ✅ Profile Controller (Fetches user details)
export const profileController = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in `req.user`
        const user = await userModel.findById(userId, { password: 0 }); // Exclude password

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Profile Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

