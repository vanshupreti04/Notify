import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Recommended salt rounds

// ✅ Create User Function (Fixes Hashing Issue)
export const createUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // ✅ Create the new user with hashed password
    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword, // Save hashed password
    });

    return user;
};

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });
    return users;
} 