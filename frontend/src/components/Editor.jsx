import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { 
    FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough, 
    FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, 
    FaListUl, FaListOl, FaLink, FaImage, FaFilePdf, FaFileWord, FaSave, 
    FaHeading, FaParagraph, FaSmile, FaGithub, FaTable, FaColumns
} from "react-icons/fa";

const fontOptions = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
];

const Editor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3] }),
            Bold,
            Italic,
            Underline,
            Strike,
            Placeholder.configure({ placeholder: "Start writing..." }),
            TextStyle,
        ],
        content: "<p></p>", // Default content
    });

    const [selectedFont, setSelectedFont] = useState("Arial, sans-serif");

    const applyFont = (font) => {
        setSelectedFont(font);
        if (!editor) return;
        editor.chain().focus().setMark("textStyle", { fontFamily: font }).run();
    };

    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 max-w-[750px] mx-auto">
            {/* Toolbar */}
            <div className="p-3 border-b rounded-t-lg space-y-3">
                
                {/* First Row: Undo, Redo, Font Selector, Headings, Text Styles, Emoji, Save */}
                <div className="flex flex-wrap items-center gap-5">
                    <button className="text-black" title="Undo"><FaUndo /></button>
                    <button className="text-black" title="Redo"><FaRedo /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Text Format (Paragraph & Headings) */}
                    <button className="text-black" title="Paragraph"><FaParagraph /></button>
                    <button className="text-black" title="Heading 1"><FaHeading size={18} /></button>
                    <button className="text-black" title="Heading 2"><FaHeading size={16} /></button>
                    <button className="text-black" title="Heading 3"><FaHeading size={14} /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Font Selector Dropdown */}
                    <select
                        value={selectedFont}
                        onChange={(e) => applyFont(e.target.value)}
                        className="w-[120px] rounded-md bg-gray-200 px-2 py-1 text-black cursor-pointer outline-none"
                    >
                        {fontOptions.map((font) => (
                            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                {font.label}
                            </option>
                        ))}
                    </select>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Text Style Icons */}
                    <button className="text-black" onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><FaBold /></button>
                    <button className="text-black" onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><FaItalic /></button>
                    <button className="text-black" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><FaUnderline /></button>
                    <button className="text-black" onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><FaStrikethrough /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Emoji & Save */}
                    <button className="text-black" title="Insert Emoji"><FaSmile /></button>
                    <button className="text-black" title="Save"><FaSave /></button>
                </div>

                {/* Second Row: Lists, Alignments, Link, Image, Export/Import, Table, Columns, GitHub Sync */}
                <div className="flex flex-wrap items-center gap-5">
                    {/* Lists */}
                    <button className="text-black" title="Unordered List"><FaListUl /></button>
                    <button className="text-black" title="Ordered List"><FaListOl /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Text Alignment */}
                    <button className="text-black" title="Align Left"><FaAlignLeft /></button>
                    <button className="text-black" title="Align Center"><FaAlignCenter /></button>
                    <button className="text-black" title="Align Right"><FaAlignRight /></button>
                    <button className="text-black" title="Justify"><FaAlignJustify /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Insert Link & Image */}
                    <button className="text-black ml-5 mr-7" title="Insert Link"><FaLink /></button>
                    <button className="text-black mr-5" title="Upload Image"><FaImage /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Export & Import */}
                    <button className="text-black ml-2 mr-3" title="Export as PDF"><FaFilePdf /></button>
                    <button className="text-black mr-2" title="Import Word Document"><FaFileWord /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* Table & Columns */}
                    <button className="text-black" title="Insert Table"><FaTable /></button>
                    <button className="text-black" title="Insert Columns"><FaColumns /></button>

                    {/* Separator */}
                    <div className="w-[1px] bg-gray-300 h-6"></div>

                    {/* GitHub Sync (Now Last) */}
                    <button className="text-black" title="Sync with GitHub"><FaGithub /></button>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none" />
        </div>
    );
};

export default Editor;