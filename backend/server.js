import "dotenv/config";
import { server } from "./app.js"; // ✅ Import server from app.js

const port = Number(process.env.PORT) || 3000;

// ✅ Start Server (Handles Port Conflicts)
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
