import { io } from "socket.io-client";

const getToken = () => localStorage.getItem("token"); // ✅ Always get the latest token

const socket = io("http://localhost:3000", {
    auth: { token: getToken() }, // ✅ Send token when connecting
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 10000, // ✅ Prevents infinite waiting
});

// ✅ Automatically update token on reconnect
socket.on("reconnect_attempt", () => {
    socket.auth = { token: getToken() };
    console.log("♻️ Reconnecting WebSocket with updated token...");
});

export default socket;
