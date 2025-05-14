'use client';

import {
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';

import TextEditor from '@/components/custom/text-editor';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { decodeHtml, unescapeHtml } from '@/utils';
import 'react-quill-new/dist/quill.snow.css';

// Dummy users and messages
const users = new Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  lastMessage: `Sample message from user ${i + 1}`,
}));

const messages: Record<number, { sender: string; text: string }[]> = {};
users.forEach((user) => {
  messages[user.id] = new Array(40).fill(null).map((_, i) => ({
    sender: i % 2 === 0 ? 'user' : 'admin',
    text: `${i % 2 === 0 ? 'User' : 'Admin'} message ${i + 1}`,
  }));
});

// Simulated API fetch with latency
const fetchMessages = async ({
  userId,
  pageParam = 1,
}: {
  userId: number;
  pageParam?: number;
}) => {
  await new Promise((res) => setTimeout(res, 1000));
  const pageSize = 10;
  const allMsgs = messages[userId] || [];
  const start = allMsgs.length - pageParam * pageSize;
  const end = start + pageSize;
  const data = allMsgs.slice(Math.max(start, 0), end);
  return {
    messages: data,
    hasMore: start > 0,
    nextPage: pageParam + 1,
  };
};

interface FormValues {
  message: string;
}

const Page = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const showChatView = selectedUserId !== null;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['messages', selectedUserId],
      enabled: !!selectedUserId,
      initialPageParam: 1, // ✅ Required!
      queryFn: ({ pageParam = 1 }) =>
        fetchMessages({ userId: selectedUserId!, pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  const allMessages = useMemo(() => {
    return [...(data?.pages ?? [])]
      .reverse() // Reverse page order so older messages come first
      .flatMap((p) => p.messages);
  }, [data]);

  useEffect(() => {
    if (selectedUserId) refetch();
  }, [selectedUserId]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [allMessages.length]);

  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (el && el.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const prevHeight = el.scrollHeight;
      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          if (el) el.scrollTop = el.scrollHeight - prevHeight;
        });
      });
    }
  };

  const handleSendMessage = (values: FormValues) => {
    messages[selectedUserId!].push({ sender: 'admin', text: values.message });
    refetch();
  };

  return (
    <div className="flex max-h-[78vh] h-[78vh] bg-neutral-0 rounded-md overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 border-r border-neutral-20 shadow-md overflow-y-auto ${
          showChatView ? 'hidden md:block' : 'block'
        }`}
      >
        <div className="p-4 border-b-2 flex items-center gap-3 h-16 bg-neutral-40">
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

      {/* Chat Panel */}
      <div
        className={`flex-1 w-full md:w-2/3 ${!showChatView ? 'hidden md:flex' : 'flex'} flex-col`}
      >
        {showChatView ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center bg-primary-300 gap-4 h-16">
              <Button
                variant="text"
                className="md:hidden"
                onClick={() => setSelectedUserId(null)}
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <UserAvatar />
              <Typography variant="h6" weight="bold">
                User Chat
              </Typography>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-2 bg-neutral-10"
            >
              {isFetchingNextPage ||
                (true &&
                  [...Array(3)].map((_, idx) => (
                    <div
                      key={`skeleton-user-${idx}`}
                      className="flex flex-col gap-2"
                    >
                      <div className="max-w-xs md:max-w-md w-fit rounded-lg self-start bg-neutral-40 p-2">
                        <Skeleton className="h-6 w-52 bg-neutral-40 rounded-lg" />
                      </div>
                      <div className="max-w-xs md:max-w-md w-fit rounded-lg self-end bg-primary-100 p-2 ml-auto text-right">
                        <Skeleton className="h-6 w-40 bg-primary-100 rounded-lg" />
                      </div>
                    </div>
                  )))}

              {allMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-xs md:max-w-md w-fit rounded-lg text-sm ${
                    msg.sender === 'admin'
                      ? 'bg-primary-100 self-end text-right ml-auto'
                      : 'bg-neutral-40 self-start'
                  }`}
                >
                  <div
                    className="prose prose-sm text-neutral-400 ql-editor"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(msg.text) }}
                  />
                  <div ref={endOfMessagesRef} />
                </div>
              ))}
            </div>

            {/* Input */}
            <Formik
              initialValues={{ message: '' }}
              onSubmit={(values, { resetForm }) => {
                handleSendMessage(values);
                resetForm();
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="p-4 border-t flex items-center gap-2">
                    <div className="flex-1">
                      <TextEditor
                        maxImageHeight="max-h-[30px]"
                        wrapperClassName="[&_.ql-editor]:max-h-[100px] [&_.ql-editor]:overflow-y-auto [&_.ql-editor]:rounded-lg"
                        content={unescapeHtml(values.message)}
                        onChange={(html) => setFieldValue('message', html)}
                      />
                    </div>
                    <Button type="submit" variant="ghost" size="icon">
                      <PaperAirplaneIcon className="text-neutral-500 h-5 w-5" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <ChatBubbleLeftIcon className="w-16 h-16 text-neutral-30" />
              <Typography
                variant="large"
                weight="medium"
                className="text-center max-w-sm px-4 text-neutral-100"
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
