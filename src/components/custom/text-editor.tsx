'use client';

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-emoji/dist/quill-emoji.css'; // Import emoji styles

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface TextEditorProps {
  content: string;
  onChange: (html: string) => void;
  maxImageHeight?: 'max-h-[30px]' | 'max-h-[100px]' | 'max-h-[200px]';
  wrapperClassName?: string;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    [{ header: [2, 3, false] }],
    ['clean'],
    ['emoji'],
  ],
  'emoji-toolbar': true,
  'emoji-textarea': true,
  'emoji-shortname': true,
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

const TextEditor: React.FC<TextEditorProps> = ({
  content,
  onChange,
  maxImageHeight,
  wrapperClassName,
}) => {
  const [value, setValue] = useState(content);
  const handleChange = (html: string) => {
    setValue(html);
    onChange(html);
  };
  useEffect(() => {
    if (content === '' && value !== '') {
      setValue('');
    }
  }, [content]);

  return (
    <div
      className={cn(
        'border border-gray-300 rounded-md prose max-w-full flex-1 overflow-visible relative z-10',
        '[&_.ql-editor_img]:max-w-full',
        maxImageHeight && `[&_.ql-editor_img]:${maxImageHeight}`,
        wrapperClassName
      )}
    >
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
