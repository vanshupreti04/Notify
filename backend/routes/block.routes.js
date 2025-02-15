import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import Block from "../models/block.model.js";
import { io } from "../app.js"; // ✅ Ensure WebSocket is imported

const router = Router();

// ✅ Create a Block (Fixed)
router.post("/", authUser, async (req, res) => {
    try {
        const { page, type, content, position } = req.body;
        if (!page || !type) return res.status(400).json({ error: "Page ID and Type are required" });

        const block = await Block.create({ page, type, content, position });

        // ✅ Emit event to WebSocket clients for real-time updates
        io.to(page).emit("newBlock", { pageId: page, block });

        res.status(201).json(block);
    } catch (error) {
        console.error("❌ Error creating block:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
