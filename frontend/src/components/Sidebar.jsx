import React, { useState } from "react";
import { X, Plus, Send } from "lucide-react"; // Icons from Lucide
import logo from "../assets/logo.png";
import TextBlock from "./TextBlock"; // Import the TextBlock component

const Sidebar = ({ createPage, savePage }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("Untitled Page");
  const [emailOrId, setEmailOrId] = useState("");
  const [editorBlocks, setEditorBlocks] = useState([]);

  // Create a new page
  const handleNewPage = () => {
    setShowEditor(true);
    createPage();
  };

  // Close the editor with a save prompt
  const handleCloseEditor = () => {
    setShowSavePrompt(true);
  };

  // Confirm close (without saving)
  const confirmCloseEditor = () => {
    setShowEditor(false);
    setShowSavePrompt(false);
  };

  // Add a new block dynamically
  const handleAddBlock = () => {
    setEditorBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: Date.now() } // Only store an ID, `TextBlock` handles the editor
    ]);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-[#2C1A47] border-r border-gray-700">
        {/* Logo & App Name */}
        <div className="flex items-center space-x-2 mb-6">
          <img src={logo} alt="App Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Notify</h1>
        </div>

        {/* Tagline */}
        <p className="text-center text-sm text-gray-400 mb-3">Start with your first note!</p>

        {/* New Page Button */}
        <button
          onClick={handleNewPage}
          className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2 mb-4"
        >
          <Plus size={18} /> <span>Add a Page</span>
        </button>

        {/* Actions (Only visible after clicking "Add Page") */}
        {showEditor && (
          <div className="flex flex-col space-y-2">
            <button onClick={handleAddBlock} className="w-full text-left px-2 py-1 bg-black hover:bg-gray-800 rounded text-white">
              + Add Block
            </button>
            <button onClick={savePage} className="w-full text-left px-2 py-1 bg-black hover:bg-gray-800 rounded text-white">
              💾 Save Page
            </button>
            <button onClick={() => setShowInvitePopup(true)} className="w-full text-left px-2 py-1 bg-black hover:bg-gray-800 rounded text-white">
              📩 Invite User
            </button>
          </div>
        )}
      </div>

      {/* Page Editor Panel */}
      {showEditor && (
        <div className="flex-1 h-screen bg-black p-6 relative">
          {/* Page Header Row */}
          <div className="flex justify-between items-center mb-4">
            {/* Page Title Input */}
            <input
              type="text"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
              className="text-2xl font-bold w-full p-2 border-b border-gray-500 outline-none bg-transparent text-white placeholder-gray-500"
              placeholder="Untitled"
            />

            {/* Close Button */}
            <button
              onClick={handleCloseEditor}
              className="text-gray-400 hover:text-white text-xl"
            >
              <X size={24} />
            </button>
          </div>

          {/* First Block (Always Present) */}
          <TextBlock />

          {/* Additional Blocks (Dynamic) */}
          {editorBlocks.map((block) => (
            <TextBlock key={block.id} />
          ))}
        </div>
      )}

      {/* Save Confirmation Popup */}
      {showSavePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <p className="text-white text-lg mb-4">Do you want to save the page before closing?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={confirmCloseEditor} className="bg-black px-4 py-2 rounded hover:bg-gray-800 text-white">
                Cancel
              </button>
              <button
                onClick={() => { savePage(); confirmCloseEditor(); }}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Popup */}
      {showInvitePopup && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50">
          <div className="bg-[#2C1A47] p-6 rounded-lg shadow-lg text-center w-96 mr-6">
            <h3 className="text-white text-lg mb-2">Invite a User</h3>
            <input
              type="email"
              placeholder="Enter email or user ID"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              className="w-full p-2 mb-4 bg-black border border-gray-600 rounded text-white"
            />
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowInvitePopup(false)} className="bg-black px-4 py-2 rounded hover:bg-gray-800 text-white">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Invitation sent to: ${emailOrId}`);
                  setShowInvitePopup(false);
                  setEmailOrId("");
                }}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white flex items-center space-x-2"
              >
                <Send size={16} /> <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
