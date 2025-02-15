import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"; 
import BlacklistedToken from "../models/blacklistedToken.model.js"; // ✅ Import Blacklist Model

// ✅ Create User Controller (Ensures password is hashed properly)
export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if email already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // ✅ Use userService to handle user creation (including password hashing)
        const user = await userService.createUser(req.body);

        // ✅ Generate JWT Token
        const token = user.generateJWT();

        // ✅ Remove password from the response object
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ user: userResponse, token });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Searching user with email:", email);

        // ✅ Fetch user and include password field
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            console.log("❌ User not found!");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log("✅ User found:", user.email);
        console.log("🔒 Stored Hashed Password:", user.password);  // Debugging hashed password

        // ✅ Ensure password comparison works correctly
        const isMatch = await user.isValidPassword(password); // ✅ Uses the schema method

        console.log("🔑 Password Match:", isMatch);

        if (!isMatch) {
            console.log("❌ Incorrect Password!");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = user.generateJWT();
        delete user._doc.password;

        console.log("✅ Login Successful!");
        res.status(200).json({ user, token });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// ✅ Get Profile Controller
export const profileController = async (req, res) => {
    res.status(200).json({ user: req.user });
};

// ✅ Logout Controller (Replaces Redis with MongoDB)
export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // ✅ Store token in MongoDB blacklist
        await BlacklistedToken.create({ token });

        // ✅ Clear the cookie
        res.cookie("token", "", { expires: new Date(0) });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout Error:", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// ✅ Get All Users Controller
export const getAllUsersController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });

        res.status(200).json({ users: allUsers });
    } catch (err) {
        console.error("Get Users Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};
