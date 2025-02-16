import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import Page from "../models/page.model.js";
import Block from "../models/block.model.js";
import User from "../models/user.model.js";
import { io } from "../app.js"; // ✅ Fixed import

const router = Router();

// ✅ Create a New Page
router.post("/", authUser, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const page = await Page.create({
            title,
            owner: req.user.id, // ✅ Ensure PageSchema includes `owner`
            sharedWith: [], // ✅ Initialize an empty sharedWith array
        });

        res.status(201).json(page);
    } catch (error) {
        console.error("❌ Error creating page:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Get All Pages for the Logged-in User
router.get("/", authUser, async (req, res) => {
    try {
        const pages = await Page.find({
            $or: [
                { owner: req.user.id },
                { "sharedWith.user": req.user.id }, // ✅ Fetch pages shared with the user
            ],
        }).populate("owner", "email");

        res.status(200).json(pages);
    } catch (error) {
        console.error("❌ Error fetching pages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Invite a User to Collaborate on a Page
router.post("/:id/invite", authUser, async (req, res) => {
    try {
        const { email, role } = req.body;
        const invitedUser = await User.findOne({ email });

        if (!invitedUser) return res.status(404).json({ error: "User not found" });

        const page = await Page.findById(req.params.id);
        if (!page) return res.status(404).json({ error: "Page not found" });

        if (String(page.owner) !== req.user.id)
            return res.status(403).json({ error: "Only the owner can invite users" });

        // ✅ Check if user is already invited
        const isAlreadyInvited = page.sharedWith.some((u) => String(u.user) === invitedUser._id.toString());
        if (isAlreadyInvited) return res.status(400).json({ error: "User already invited" });

        // ✅ Add user to sharedWith array
        page.sharedWith.push({ user: invitedUser._id, role: role || "viewer" });
        await page.save();

        // ✅ Emit real-time invite notification
        io.to(invitedUser._id.toString()).emit("receiveInvite", {
            pageTitle: page.title,
            pageId: page._id,
        });

        res.json({ message: "✅ Invite sent successfully" });
    } catch (error) {
        console.error("❌ Error inviting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
