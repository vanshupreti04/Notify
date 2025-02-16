import React, { useState, useRef } from "react";
import { Plus, Trash2, Edit, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom"; // For navigation

const Sidebar = ({ pages, selectedPage, setSelectedPage, createPage, setPages, createNestedPage }) => {
    const [editingPageId, setEditingPageId] = useState(null);
    const [tempFileNames, setTempFileNames] = useState({});
    const [deletePopup, setDeletePopup] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false); // State for settings menu
    const inputRef = useRef(null);
    const navigate = useNavigate(); // Navigation hook

    // Function to handle renaming state
    const handleRename = () => {
        setEditingPageId(null);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout logic here (e.g., clearing tokens, user state)
        navigate("/"); // Redirect to home route
    };

    return (
        <div className="w-64 bg-[#2C1A47] text-white p-4 border-r border-gray-700 h-screen flex flex-col relative">
            {/* User Info */}
            <div className="flex items-center space-x-2 pb-4 border-b border-gray-600">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                <span className="font-semibold">Antonio Erdeljac</span>
            </div>

            {/* Sidebar Menu Options */}
            <div className="mt-4 space-y-2 relative">
                <button
                    className="flex items-center space-x-2 text-gray-300 hover:bg-[#422c63] px-3 py-2 rounded-lg w-full"
                >
                    <Search size={18} /> <span>Search</span>
                </button>

                {/* Settings Button */}
                <button
                    className="flex items-center space-x-2 text-gray-300 hover:bg-[#422c63] px-3 py-2 rounded-lg w-full relative"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                >
                    <Settings size={18} /> <span>Settings</span>
                </button>

                {/* Settings Dropdown */}
                {settingsOpen && (
                    <div className="absolute top-12 left-60 bg-[#3D1E70] text-white shadow-lg rounded-md p-2 w-40 border border-gray-600 z-50">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-purple-400 hover:text-black transition rounded"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-red-600 transition rounded"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* New Page Button */}
            <button
                onClick={createPage}
                className="mt-4 flex items-center space-x-2 bg-[#3D1E70] text-white font-bold py-2 px-3 rounded-lg w-full hover:bg-[#4e2a8d] transition"
            >
                <Plus size={18} /> <span>New Page</span>
            </button>

            {/* Pages List */}
            <div className="mt-4 flex-grow space-y-1">
                {pages.map((page) => (
                    <div key={page._id} className="relative group">
                        <div
                            className="flex items-center justify-between p-2 rounded cursor-pointer "
                            onClick={() => setSelectedPage(page._id)}
                        >
                            {/* Editable Title */}
                            {editingPageId === page._id ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="text-black border border-gray-500 rounded-md w-full focus:outline-none"
                                    value={tempFileNames[page._id] || page.title || "Untitled"}
                                    onChange={(e) =>
                                        setTempFileNames({ ...tempFileNames, [page._id]: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleRename();
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span className="truncate">{tempFileNames[page._id] || page.title || "Untitled"}</span>
                            )}

                            <div className="flex items-center space-x-2">
                                {/* Rename Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingPageId(page._id);
                                        setTempFileNames({
                                            ...tempFileNames,
                                            [page._id]: tempFileNames[page._id] || page.title || "Untitled",
                                        });
                                        setTimeout(() => inputRef.current?.focus(), 0);
                                    }}
                                    className="opacity-50 hover:opacity-100"
                                >
                                    <Edit size={16} />
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeletePopup(page._id);
                                    }}
                                    className="opacity-50 hover:opacity-100 text-red-400"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Add Nested Page Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        createNestedPage(page._id);
                                    }}
                                    className="opacity-50 hover:opacity-100 text-green-400"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trash Section */}
            <button className="flex items-center space-x-2 text-gray-300 hover:bg-[#422c63] px-3 py-2 rounded-lg w-full">
                <Trash2 size={18} /> <span>Trash</span>
            </button>
        </div>
    );
};

export default Sidebar;