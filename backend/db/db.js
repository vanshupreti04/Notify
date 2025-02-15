import mongoose from "mongoose";

let isConnected = false; // Track connection status

const connect = async () => {
    if (isConnected) {
        console.log("✅ Already connected to MongoDB.");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI);
        isConnected = true;
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);

        // ✅ Listen for disconnects and attempt reconnection
        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB Disconnected! Attempting to reconnect...");
            isConnected = false;
            connect(); // Reconnect
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Error:", err);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connect;
