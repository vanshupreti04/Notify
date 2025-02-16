import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
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

    const handleShare = () => {
        console.log("Sharing with:", shareEmail);
        setShowSharePopup(false);
        setShareEmail("");
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
            {/* Sidebar */}
            <Sidebar
                pages={pages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                createPage={createNewPage}
            />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${showCommentSidebar ? "mr-72" : ""}`}>

                {/* Header (Always Visible) */}
                <div className="flex justify-end items-center p-4">
                    <button
                        className="flex items-center text-gray-700 hover:text-gray-900 mr-4"
                        onClick={() => setShowCommentSidebar(true)}
                    >
                        <MessageCircle size={20} className="mr-1" />
                        Comment
                    </button>
                    <button
                        className="flex items-center text-gray-700 hover:text-gray-900"
                        onClick={() => setShowSharePopup(true)}
                    >
                        <Share2 size={20} className="mr-1" />
                        Share
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
                    <>

                {/* Editor */}
                {showEditor && (
                    <div className="flex-1 flex items-start justify-center mt-6 p-6 w-full transition-all duration-300">
                        <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                            <Editor
                                pageId={selectedPage}
                                blocks={blocks[selectedPage] || []}
                                setBlocks={(newBlocks) =>
                                    setBlocks((prev) => ({ ...prev, [selectedPage]: newBlocks }))
                                }
                            />
                        </div>
                    </div>
                      )}
                </>
                )}
            </div>

            {/* Comment Sidebar */}
            {showCommentSidebar && (
                <div className="fixed right-0 top-0 h-full w-72 bg-[#2C1A47] p-4 shadow-lg text-white flex flex-col transition-all duration-300">
                    <button onClick={() => setShowCommentSidebar(false)} className="absolute top-4 right-4 text-white">
                        <X size={20} />
                    </button>
                    <h2 className="font-bold text-lg">Comment</h2>

                    {/* Comment List (Messages Appear from Bottom-Up) */}
                    <div className="flex-1 overflow-y-auto mt-auto flex flex-col-reverse pb-4">
                        {comments.length === 0 ? (
                            <p className="text-center text-white opacity-50">Write a comment...</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="relative flex justify-between items-center bg-white text-black p-2 rounded-md mb-2">
                                    <span>{comment}</span>
                                    <div className="relative">
                                        <button onClick={() => setCommentOptions(commentOptions === index ? null : index)}>
                                            <MoreVertical size={18} className="text-gray-700" />
                                        </button>

                                        {/* Delete button (just below the three-dot icon) */}
                                        {commentOptions === index && (
                                            <div className="absolute right-0 top-6 w-20 bg-white text-black rounded-md shadow-md">
                                                <button
                                                    onClick={() => {
                                                        deleteComment(index);
                                                        setCommentOptions(null);
                                                    }}
                                                    className="flex items-center px-3 py-1 w-full text-sm transition-colors duration-200 hover:bg-gray-300 rounded-md"
                                                >
                                                    <Trash2 size={14} className="mr-1" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input Field (Remains at the Bottom) */}
                    <div className="pb-4">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full border p-2 rounded-lg text-black"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            onClick={addComment}
                            className="mt-2 bg-white text-black px-4 py-2 rounded-lg flex items-center w-full"
                        >
                            <Send size={16} className="mr-1" /> Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;