import userModel from '../models/user.model.js';
import crypto from "crypto"; // ✅ Using crypto for manual hashing

// ✅ Manual Hash Function (SHA256)
const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

export const createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error("First name, last name, email, and password are required");
    }

    const hashedPassword = hashPassword(password); // ✅ Manually hash password

    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword, // ✅ Store hashed password
    });

    return user;
};

export const getAllUsers = async ({ userId }) => {
    return await userModel.find({ _id: { $ne: userId } });
};
