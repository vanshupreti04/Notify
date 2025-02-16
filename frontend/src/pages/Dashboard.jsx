import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import socket, { connectSocket, disconnectSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
    CheckCircle,
    FilePlus2,
    Share2,
    MessageCircle,
    X,
    Send,
    MoreVertical,
    Trash2,
    Notebook,
} from "lucide-react"; // Lucide icons
import logo from "../assets/logo.png"; // Your logo file

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [blocks, setBlocks] = useState({});
    const [selectedPage, setSelectedPage] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [showCommentSidebar, setShowCommentSidebar] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentOptions, setCommentOptions] = useState(null);
    const [shareEmail, setShareEmail] = useState("");
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [renamePopup, setRenamePopup] = useState(null);
    const [newFileName, setNewFileName] = useState("");

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const pagesFetched = useRef(false); // Prevent refetching pages multiple times

    // Redirect to login if no token
    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    // Fetch pages (Preventing infinite loop)
    useEffect(() => {
        if (!token || pagesFetched.current) return;

        const fetchPages = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/pages", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPages(data);
                pagesFetched.current = true; // Mark as fetched

                if (data.length > 0) {
                    setSelectedPage(data[0]._id);
                    data.forEach((page) => fetchBlocks(page._id));
                    setShowEditor(true);
                }
            } catch (error) {
                console.error("❌ Error fetching pages:", error);
            }
        };

        fetchPages();
    }, [token]);

    // WebSocket connection
    useEffect(() => {
        connectSocket();
        return () => disconnectSocket();
    }, []);

    const fetchBlocks = async (pageId) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/blocks/${pageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBlocks((prevBlocks) => ({
                ...prevBlocks,
                [pageId]: data,
            }));
        } catch (error) {
            console.error(`❌ Error fetching blocks for page ${pageId}:`, error);
        }
    };

    const createNewPage = async () => {
        setShowEditor(true);
        setShowWelcomeScreen(false);

        try {
            const { data } = await axios.post(
                "http://localhost:3000/pages",
                { title: "Untitled" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPages((prevPages) => [...prevPages, data]);
            setSelectedPage(data._id);
            setBlocks((prev) => ({ ...prev, [data._id]: [] }));

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (error) {
            console.error("❌ Error creating new page:", error);
        }
    };

    const handleRename = async (pageId) => {
        try {
            await axios.put(
                `http://localhost:3000/pages/${pageId}`,
                { title: newFileName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPages((prevPages) =>
                prevPages.map((page) =>
                    page._id === pageId ? { ...page, title: newFileName } : page
                )
            );
            setRenamePopup(null);
        } catch (error) {
            console.error("❌ Error renaming page:", error);
        }
    };

    const deletePage = async (pageId) => {
        try {
            await axios.delete(`http://localhost:3000/pages/${pageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPages((prevPages) => prevPages.filter((page) => page._id !== pageId));

            if (selectedPage === pageId) {
                setSelectedPage(null);
                setShowEditor(false);
            }

            setRenamePopup(null);
        } catch (error) {
            console.error("❌ Error deleting page:", error);
        }
    };

    const addComment = () => {
        if (newComment.trim() === "") return;
        setComments((prev) => [newComment, ...prev]);
        setNewComment("");
    };

    const deleteComment = (index) => {
        setComments((prev) => prev.filter((_, i) => i !== index));
        setCommentOptions(null);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                pages={pages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                createPage={createNewPage}
            />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${showCommentSidebar ? "mr-72" : ""}`}>

                {/* Header */}
                <div className="flex justify-end items-center p-4">
                    <button
                        className="flex items-center text-gray-700 hover:text-gray-900 mr-4"
                        onClick={() => setShowCommentSidebar(true)}
                    >
                        <MessageCircle size={20} className="mr-1" />
                        Comment
                    </button>
                </div>

                {/* Welcome Screen */}
                {showWelcomeScreen ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Notebook size={50} className="text-gray-600 mb-4" />
                        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Notify</h1>
                        <p className="text-gray-500 mb-6">Create your first note to get started!</p>
                        <button
                            onClick={createNewPage}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center hover:bg-purple-700 transition"
                        >
                            <FilePlus2 size={20} className="mr-2" /> New Note
                        </button>
                    </div>
                ) : (
                    showEditor && <Editor pageId={selectedPage} blocks={blocks[selectedPage] || []} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
