import "dotenv/config";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import pageRoutes from "./routes/page.routes.js";
import blockRoutes from "./routes/block.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Block from "./models/block.model.js";

dotenv.config();
const app = express();
connect();

// ✅ Secure CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "*", // Change "*" to your frontend URL for security
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// ✅ API Routes
app.use("/users", userRoutes);
app.use("/pages", pageRoutes);
app.use("/blocks", blockRoutes);

// ✅ Create HTTP & WebSocket Server
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL || "*", methods: ["GET", "POST"] },
    perMessageDeflate: true,
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const PORT = process.env.PORT || 3000;

// ✅ Start Server & Handle Errors
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use. Exiting...`);
        process.exit(1);
    } else {
        console.error("❌ Server error:", err);
    }
});

// ✅ WebSocket Authentication Middleware
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
        console.error("❌ WebSocket Connection Rejected: No Token Provided");
        return next(new Error("Unauthorized: No Token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        console.log(`✅ WebSocket Authenticated (User: ${socket.user.email}, Socket ID: ${socket.id})`);
        next();
    } catch (err) {
        console.error("❌ Invalid WebSocket Token:", err.message);
        return next(new Error("Unauthorized: Invalid Token"));
    }
});

// ✅ WebSocket Events
io.on("connection", (socket) => {
    console.log(`🟢 WebSocket Connected: ${socket.id}`);

    socket.on("joinPage", (pageId) => {
        socket.join(pageId);
        console.log(`📄 User ${socket.user.email} joined page: ${pageId}`);
    });

    socket.on("leavePage", (pageId) => {
        socket.leave(pageId);
        console.log(`🚪 User ${socket.user.email} left page: ${pageId}`);
    });

    socket.on("editBlock", async ({ pageId, blockId, content }) => {
        try {
            await Block.findByIdAndUpdate(blockId, { content }, { new: true }).lean();
            socket.to(pageId).emit("updateBlock", { blockId, content });
        } catch (error) {
            console.error("❌ Error updating block:", error);
        }
    });

    socket.on("sendInvite", ({ invitedUserId, inviter, pageTitle, pageId }) => {
        io.to(invitedUserId).emit("receiveInvite", { inviter, pageTitle, pageId });
    });

    socket.on("newBlock", ({ pageId, block }) => {
        io.to(pageId).emit("newBlock", { pageId, block });
    });

    socket.on("deleteBlock", async ({ pageId, blockId }) => {
        try {
            await Block.findByIdAndDelete(blockId);
            socket.to(pageId).emit("removeBlock", { blockId });
        } catch (error) {
            console.error("❌ Error deleting block:", error);
        }
    });

    socket.on("moveBlock", async ({ pageId, blockId, newPosition }) => {
        try {
            const block = await Block.findById(blockId);
            if (block) {
                block.position = newPosition;
                await block.save();
                socket.to(pageId).emit("updateBlockPosition", { blockId, newPosition });
            }
        } catch (error) {
            console.error("❌ Error moving block:", error);
        }
    });

    socket.on("disconnect", (reason) => {
        console.log(`🔴 WebSocket Disconnected: ${socket.id} (Reason: ${reason})`);
    });

    socket.on("error", (error) => {
        console.error("❌ WebSocket Error:", error);
    });
});

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

const port = Number(process.env.PORT) || 3000;

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${port} is already in use. Trying another port...`);
        server.listen(0, () => {
            console.log(`🚀 Server running on available port ${server.address().port}`);
        });
    } else {
        console.error("❌ Server error:", err);
    }
});

export { app, server, io };
