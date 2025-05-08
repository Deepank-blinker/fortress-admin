'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TextEditoProps {
  content: string;
  onChange: (html: string) => void;
}

const TextEditor: React.FC<TextEditoProps> = ({
  content = '',
  onChange = () => {},
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="w-full bg-neutral-20 border border-neutral-30 rounded-lg p-4">
      <div className="toolbar">
        {/* <button onClick={addImage}>Insert Image</button>
        <button onClick={addVideo}>Insert Video</button> */}
      </div>
      <EditorContent editor={editor} className=" border-0 outline-none" />
    </div>
  );
};

export default TextEditor;
