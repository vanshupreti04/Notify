import { Router } from "express";
import { body, validationResult } from "express-validator";
import { 
    createUserController, 
    loginController, 
    profileController, 
    logoutController, 
    getAllUsersController 
} from "../controllers/user.controller.js"; // ✅ FIX: Named imports

import { authUser } from "../middleware/auth.middleware.js"; // ✅ FIX: Named import for middleware

const router = Router();

// ✅ Middleware for Validation Handling
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// ✅ Register Route
router.post(
    "/register",
    [
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Email must be a valid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    validateRequest,
    createUserController
);

// ✅ Login Route
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email must be a valid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    validateRequest,
    loginController
);

// ✅ Profile Route (Protected)
router.get("/profile", authUser, profileController);

// ✅ Logout Route
router.post("/logout", authUser, logoutController);

// ✅ Get All Users (Protected)
router.get("/all", authUser, getAllUsersController);

export default router;
