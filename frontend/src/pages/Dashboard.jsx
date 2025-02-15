import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [blocks, setBlocks] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("viewer");
    const [selectedPage, setSelectedPage] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // ✅ Redirect if not logged in
    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    // ✅ Fetch Pages on Load
    useEffect(() => {
        if (!token) return;

        const fetchPages = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/pages", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPages(data);
                data.forEach((page) => fetchBlocks(page._id));
            } catch (error) {
                console.error("❌ Error fetching pages:", error);
            }
        };
        fetchPages();
    }, [token]);

    // ✅ Fetch Blocks for Each Page
    const fetchBlocks = async (pageId) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/blocks/${pageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlocks((prevBlocks) => ({ ...prevBlocks, [pageId]: data }));
        } catch (error) {
            console.error(`❌ Error fetching blocks for page ${pageId}:`, error);
        }
    };

    // ✅ Create a New Page (Fixed)
    const createPage = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/pages",
                { title: "Untitled Page" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPages([...pages, data]);
        } catch (error) {
            console.error("❌ Error creating page:", error);
        }
    };

    // ✅ Add a New Block (Fixed)
    const addBlock = async (pageId) => {
        try {
            const newBlock = { page: pageId, type: "text", content: "", position: (blocks[pageId]?.length || 0) + 1 };

            const { data } = await axios.post("http://localhost:3000/blocks", newBlock, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBlocks((prevBlocks) => ({
                ...prevBlocks,
                [pageId]: [...(prevBlocks[pageId] || []), data],
            }));

            socket.emit("newBlock", { pageId, block: data });

        } catch (error) {
            console.error("❌ Error adding block:", error);
        }
    };

    // ✅ Save Page (Fixed)
    const savePage = async (pageId) => {
        try {
            const pageBlocks = blocks[pageId] || [];
            await axios.put(`http://localhost:3000/pages/${pageId}/save`, { blocks: pageBlocks }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Page saved successfully!");
        } catch (error) {
            console.error("❌ Error saving page:", error);
        }
    };

    // ✅ Invite User to Page (Fixed)
    const inviteUser = async (pageId) => {
        if (!inviteEmail) return alert("❌ Please enter an email!");

        try {
            const response = await axios.post(
                `http://localhost:3000/pages/${pageId}/invite`,
                { email: inviteEmail, role: inviteRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            socket.emit("sendInvite", { invitedEmail: inviteEmail, pageId });

            alert(response.data.message);
            setInviteEmail(""); // Reset input
        } catch (error) {
            console.error("❌ Error inviting user:", error.response?.data || error.message);
        }
    };

    // ✅ Listen for WebSocket Events (New Blocks & Invites)
    useEffect(() => {
        socket.on("newBlock", ({ pageId, block }) => {
            setBlocks((prevBlocks) => ({
                ...prevBlocks,
                [pageId]: [...(prevBlocks[pageId] || []), block],
            }));
        });

        socket.on("receiveInvite", ({ inviter, pageTitle, pageId }) => {
            setNotifications((prev) => [
                ...prev,
                `📩 ${inviter} invited you to edit: ${pageTitle}`,
            ]);
        });

        return () => {
            socket.off("newBlock");
            socket.off("receiveInvite");
        };
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold">🚀 Notion FOSS</h1>

            {/* ✅ Notifications */}
            <div className="mb-4">
                {notifications.map((note, index) => (
                    <p key={index} className="text-blue-500">{note}</p>
                ))}
            </div>

            <Sidebar
                pages={pages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                createPage={createPage}
                addBlock={addBlock}
                savePage={savePage}
                inviteUser={inviteUser}
            />

            {/* ✅ Page Editor */}
            {selectedPage && (
                <div className="mt-6 p-6 border rounded bg-white">
                    <h2 className="text-2xl font-bold">Editing: {pages.find(p => p._id === selectedPage)?.title}</h2>
                    <Editor pageId={selectedPage} blocks={blocks[selectedPage] || []} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
