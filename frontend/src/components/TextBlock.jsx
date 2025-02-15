import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const TextBlock = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write something here..." }),
    ],
    content: "",
  });

  return (
    <div className="border p-4 bg-gray-800 border-gray-500 rounded-lg shadow-lg mt-4">
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
};

export default TextBlock;
