import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import socket from "../socket";

const Editor = ({ blockId, initialContent, pageId }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Start typing...',
            }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {
            const updatedContent = editor.getHTML();
            socket.emit("editBlock", { pageId, blockId, content: updatedContent });
        },
    });

    useEffect(() => {
        socket.on("updateBlock", ({ blockId: updatedId, content }) => {
            if (updatedId === blockId) {
                editor?.commands.setContent(content);
            }
        });

        return () => socket.off("updateBlock");
    }, [editor, blockId]);

    return <EditorContent editor={editor} className="border p-2 min-h-[200px]" />;
};

export default Editor;
