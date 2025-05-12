'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface TextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    [{ header: [2, 3, false] }],
    ['clean'],
  ],
};

const formats = [
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'header',
];

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
  const [value, setValue] = useState(content);
  const handleChange = (html: string) => {
    setValue(html);
    onChange(html);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
