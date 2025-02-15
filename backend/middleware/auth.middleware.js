import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/blacklistedToken.model.js"; // Import the blacklist model

export const authUser = async (req, res, next) => {
    try {
        // Get the token from cookies or headers
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        // Check if the token is blacklisted (user logged out)
        const isBlacklisted = await BlacklistedToken.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).send({ error: 'Token is blacklisted. Please log in again.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request

        next(); // Continue to the next middleware/controller
    } catch (error) {
        console.log("Auth Error:", error);
        res.status(401).send({ error: 'Unauthorized User' });
    }
};
