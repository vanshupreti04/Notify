import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/blacklistedToken.model.js";
import "dotenv/config"; // ✅ Ensure environment variables are loaded

export const authUser = async (req, res, next) => {
    try {
        // ✅ Get the token from cookies or headers
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // ✅ Check if the token is blacklisted (user logged out)
        const isBlacklisted = await BlacklistedToken.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ error: "Session expired. Please log in again." });
        }

        // ✅ Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request

        next(); // ✅ Continue to the next middleware/controller
    } catch (error) {
        console.error("❌ Authentication Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired. Please log in again." });
        }

        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
