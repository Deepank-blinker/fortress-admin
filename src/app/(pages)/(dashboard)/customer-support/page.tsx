'use client';

import FormField from '@/components/custom/form-field';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { Button } from '@/components/ui/button';
import {
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import { Form, Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'Alice',
    lastMessage:
      'I need help with my order and are you okay sbfsbdfbsbdjfbjsbdjgbjkdbnfjkgn',
  },
  {
    id: 2,
    name: 'Bob',
    lastMessage:
      'Payment issue here and are you okay sbfsbdfbsbdjfbjsbdjgbjkdbnfjkgn',
  },
  {
    id: 3,
    name: 'Charlie',
    lastMessage:
      'Thanks for the update and are you okay sbfsbdfbsbdjfbjsbdjgbjkdbnfjkgn',
  },
];

const messages: Record<number, { sender: string; text: string }[]> = {
  1: [
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
    { sender: 'user', text: 'I need help with my order' },
    { sender: 'admin', text: 'Sure, what seems to be the issue?' },
  ],
  2: [
    { sender: 'user', text: 'Payment issue here' },
    { sender: 'admin', text: 'Can you elaborate more?' },
  ],
  3: [
    { sender: 'user', text: 'Thanks for the update' },
    { sender: 'admin', text: "You're welcome!" },
  ],
};

const Page = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const showChatView = selectedUserId !== null;

  const handleBack = () => setSelectedUserId(null);

  return (
    <div className="flex max-h-[78vh] h-[78vh] bg-neutral-0 rounded-md overflow-hidden">
      {/* Left panel: User list */}
      <div
        className={`w-full md:w-1/3 border-r border-neutral-20 shadow-md overflow-y-auto  ${
          showChatView ? 'hidden md:block' : 'block'
        }`}
      >
        <div className="p-4 border-b-2 flex items-center gap-3 h-16 overflow-hidden bg-neutral-40">
          <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-primary-500" />
          <Typography variant="h5" weight="bold">
            User Chats
          </Typography>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 hover:bg-primary-75 cursor-pointer flex items-center gap-3"
            onClick={() => setSelectedUserId(user.id)}
          >
            <UserAvatar />
            <div className="w-[calc(100%-3rem)] overflow-hidden">
              <Typography variant="base" weight="bold" className="truncate">
                {user.name}
              </Typography>
              <Typography variant="small" className="truncate text-neutral-600">
                {user.lastMessage}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Right panel: Chat window */}
      <div
        className={`flex-1 w-full md:w-2/3 ${
          !showChatView ? 'hidden md:flex' : 'flex'
        } flex-col`}
      >
        {showChatView ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center bg-primary-300 gap-4 h-16 overflow-hidden">
              <Button variant="text" className="md:hidden" onClick={handleBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {/* //TODO: onclick view detail user/organization */}
              <div className="cursor-pointer">
                <UserAvatar />
              </div>
              <Typography variant="h6" weight="bold">
                John Snow
              </Typography>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-neutral-10">
              {messages[selectedUserId!].map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-xs md:max-w-md p-3 w-fit rounded-lg text-sm ${
                    msg.sender === 'admin'
                      ? 'bg-primary-100 self-end text-right ml-auto'
                      : 'bg-neutral-40 self-start'
                  }`}
                >
                  <Typography variant="small">{msg.text}</Typography>
                </div>
              ))}
            </div>

            {/* Input (placeholder) */}
            <Formik
              initialValues={{ message: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <div className="p-4 border-t flex items-center gap-2">
                  {/* Icons for link, image, and document upload */}
                  {/* <Button type="button" variant="ghost" size="sm">
                    <LinkIcon className="h-5 w-5 text-neutral-500" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon">
                    <PhotoIcon className="h-5 w-5 text-neutral-500" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon">
                    <PaperClipIcon className="h-5 w-5 text-neutral-500" />
                  </Button> */}

                  {/* Message input */}
                  <div className="flex-1">
                    <FormField
                      name="message"
                      type="text"
                      placeholder="Type a message..."
                      className="w-full border px-4 py-2 rounded text-sm"
                      as="input"
                    />
                  </div>

                  {/* Send button */}
                  <Button type="submit" variant="ghost" size="icon">
                    <PaperAirplaneIcon className="text-neutral-500 h-5 w-5" />
                  </Button>
                </div>
              </Form>
            </Formik>
          </>
        ) : (
          // Show a message on md+ screens if no chat selected
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <ChatBubbleLeftIcon className="w-16 h-16 text-neutral-30" />
              <Typography
                variant="large"
                weight="medium"
                color="text-neutral-100"
                className=" text-center max-w-sm px-4"
              >
                Select a user from the chat list to view and respond to their
                messages.
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
