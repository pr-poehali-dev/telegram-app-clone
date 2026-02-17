import { useState } from "react";
import { Chat } from "@/types/messenger";
import ChatListItem from "./ChatListItem";
import Icon from "@/components/ui/icon";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export default function ChatList({ chats, activeChatId, onChatSelect }: ChatListProps) {
  const [search, setSearch] = useState("");

  const filtered = chats
    .filter((c) => !c.isArchived)
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const pinned = filtered.filter((c) => c.isPinned);
  const regular = filtered.filter((c) => !c.isPinned);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3 shrink-0">
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-4 py-2 bg-[hsl(var(--messenger-received))] rounded-full text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {pinned.length > 0 && (
          <>
            {pinned.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onClick={() => onChatSelect(chat.id)}
              />
            ))}
            {regular.length > 0 && <div className="h-px bg-border mx-3" />}
          </>
        )}
        {regular.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>
    </div>
  );
}
