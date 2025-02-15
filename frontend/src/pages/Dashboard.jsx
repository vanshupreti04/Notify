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

    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    useEffect(() => {
        if (!token) return;

        const fetchPages = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/pages", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPages(data);
                if (data.length > 0) {
                    setSelectedPage(data[0]._id); // ✅ Auto-select first page
                    data.forEach((page) => fetchBlocks(page._id));
                }
            } catch (error) {
                console.error("❌ Error fetching pages:", error);
            }
        };
        fetchPages();
    }, [token]);

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

    return (
        <div>

            <Sidebar
                pages={pages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                createPage={() => {}}
                addBlock={() => {}}
                savePage={() => {}}
                inviteUser={() => {}}
            />

            {selectedPage && blocks[selectedPage] && (
                <div className="mt-6 p-6 border rounded bg-white">
                    <h2 className="text-2xl font-bold">Editing: {pages.find(p => p._id === selectedPage)?.title}</h2>
                    {blocks[selectedPage].map(block => (
                        <Editor key={block._id} pageId={selectedPage} blockId={block._id} initialContent={block.content} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
