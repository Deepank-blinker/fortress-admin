'use client';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletIcon,
  NumberedListIcon,
  PhotoIcon,
  UnderlineIcon,
} from '@heroicons/react/24/solid';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Form, Formik } from 'formik';
import { Heading1, Heading2, Heading3 } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import FormField from './form-field';

interface TextEditoProps {
  content: string;
  onChange: (html: string) => void;
}

const TextEditor: React.FC<TextEditoProps> = ({
  content = '',
  onChange = () => {},
}) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const handleAddImage = (src: string) => {
    editor
      ?.chain()
      .focus()
      .insertContent([
        { type: 'paragraph' },
        { type: 'image', attrs: { src } },
        { type: 'paragraph' },
      ])
      .run();
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleAddImage(url); // use your new insert logic
      event.target.value = ''; // reset file input
    }
  };

  const handleCloseLinkModal = () => {
    setLinkModalOpen(false);
  };
  const handleOpenLinkModal = () => {
    setLinkModalOpen(true);
  };

  const handleAddLink = (link: { url: string; text?: string }) => {
    // Also insert it into the editor:
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: link.url })
      .insertContent(link.text || link.url)
      .run();
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),

      Image.configure({
        HTMLAttributes: {
          class:
            'w-full h-auto object-contain aspect-[16/9] max-h-[360px] border rounded-md',
        },
      }),
      Underline,
      TextStyle,
      Heading,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="bg-neutral-10 border-2 border-neutral-900  rounded-lg overflow-hidden ">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center space-x-1 mr-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('bold') && 'bg-neutral-200'
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('italic') && 'bg-neutral-200'
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('underline') && 'bg-neutral-200'
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center space-x-1 mx-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('heading', { level: 1 }) && 'bg-neutral-200'
            )}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('heading', { level: 2 }) && 'bg-neutral-200'
            )}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('heading', { level: 3 }) && 'bg-neutral-200'
            )}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center space-x-1 mx-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('bulletList') && 'bg-neutral-200'
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <ListBulletIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('orderedList') && 'bg-neutral-200'
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Ordered List"
          >
            <NumberedListIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center space-x-1 mx-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className={cn(
              'p-2 h-8 w-8',
              editor.isActive('link') && 'bg-neutral-200'
            )}
            onClick={handleOpenLinkModal}
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className="p-2 h-8 w-8"
            onClick={handleImageButtonClick}
            title="Insert Image"
          >
            <PhotoIcon className="h-4 w-4" />
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-full  tiptap-content "
      />

      <LinkModal
        open={linkModalOpen}
        onClose={handleCloseLinkModal}
        onSubmit={handleAddLink}
      />
    </div>
  );
};

export default TextEditor;
interface LinkModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (link: { url: string; text?: string }) => void; // one link at a time
}

const LinkModal: React.FC<LinkModalProps> = ({ open, onClose, onSubmit }) => {
  const [linkPreview, setLinkPreview] = useState<string | null>(null);
  const checkLinkPreview = async (url: string) => {
    try {
      // Simple validation to check if it's a valid URL
      if (url.startsWith('http://') || url.startsWith('https://')) {
        setLinkPreview(url);
      } else {
        setLinkPreview(null);
      }
    } catch (error: unknown) {
      console.log(error);
      setLinkPreview(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
          <DialogDescription aria-labelledby="" />
        </DialogHeader>

        <Formik
          initialValues={{ url: '', text: '' }}
          validationSchema={Yup.object({
            url: Yup.string().url('Enter a valid URL').required('Required'),
            text: Yup.string(),
          })}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values); // pass link to parent
            resetForm();
            onClose(); // close modal
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <FormField
                name="url"
                label="Link"
                placeholder="Paste a link"
                required
                onChange={(e) => {
                  setFieldValue('url', e.target.value);
                  checkLinkPreview(e.target.value);
                }}
              />
              <FormField
                name="text"
                label="Display text (optional)"
                placeholder="Text to display"
              />

              {linkPreview && (
                <div className="mt-4 p-3 border rounded-md bg-neutral-50">
                  <p className="text-sm font-medium">Link Preview:</p>
                  <a
                    href={linkPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm break-all hover:underline"
                  >
                    {linkPreview}
                  </a>
                </div>
              )}

              <DialogFooter className="justify-end mt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Insert</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
