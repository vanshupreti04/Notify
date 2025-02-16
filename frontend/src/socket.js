import { io } from "socket.io-client";

const getToken = () => localStorage.getItem("token");

const createSocket = () => {
    return io("http://localhost:3000", {
        auth: { token: getToken() },
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 10000,
        autoConnect: false, // Prevent auto-connection
    });
};

const socket = createSocket();

socket.on("reconnect_attempt", () => {
    socket.auth = { token: getToken() };
    console.log("♻️ Reconnecting WebSocket with updated token...");
});

// Function to manually connect WebSocket for collaboration
export const connectSocket = () => {
    const token = getToken();
    if (!token) {
        console.error("❌ No token found. WebSocket will not connect.");
        return;
    }

    socket.auth = { token };
    console.log("🔌 Connecting WebSocket with token:", token);
    socket.connect();
};

// Function to manually disconnect WebSocket
export const disconnectSocket = () => {
    if (socket.connected) {
        console.log("🔌 Disconnecting WebSocket...");
        socket.disconnect();
    }
};

// Heartbeat to keep connection alive
let heartbeatInterval;
socket.on("connect", () => {
    console.log("🟢 WebSocket Connected:", socket.id);

    clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => {
        socket.emit("heartbeat", { time: Date.now() });
    }, 30000);
});

socket.on("disconnect", (reason) => {
    console.log(`🔴 WebSocket Disconnected: ${reason}`);
    clearInterval(heartbeatInterval);
});

export default socket;
