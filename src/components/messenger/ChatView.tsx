import { useState, useRef, useEffect } from "react";
import { Chat, Message } from "@/types/messenger";
import { messages as allMessages, users } from "@/data/mock-data";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
}

export default function ChatView({ chat, onBack }: ChatViewProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>(
    allMessages.filter((m) => m.chatId === chat.id)
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatMessages(allMessages.filter((m) => m.chatId === chat.id));
  }, [chat.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      chatId: chat.id,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const isGroup = chat.type !== "private";

  const getSenderName = (senderId: string) => {
    if (senderId === "me") return undefined;
    const user = users.find((u) => u.id === senderId);
    return user?.name;
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} onBack={onBack} onInfo={() => {}} />

      <div className="flex-1 overflow-y-auto scrollbar-thin bg-white py-2">
        {chatMessages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Нет сообщений. Начните общение!
          </div>
        )}
        {chatMessages.map((msg, i) => {
          const isMine = msg.senderId === "me";
          const showSender =
            isGroup &&
            !isMine &&
            (i === 0 || chatMessages[i - 1].senderId !== msg.senderId);

          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={isMine}
              senderName={showSender ? getSenderName(msg.senderId) : undefined}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
