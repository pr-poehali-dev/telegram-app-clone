import { useState } from "react";
import { chats, messages, users } from "@/data/mock-data";
import UserAvatar from "./UserAvatar";
import Icon from "@/components/ui/icon";

export default function SearchView() {
  const [query, setQuery] = useState("");

  const matchedChats = query
    ? chats.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const matchedMessages = query
    ? messages.filter((m) => m.text.toLowerCase().includes(query.toLowerCase()))
    : [];

  const matchedUsers = query
    ? users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const hasResults = matchedChats.length > 0 || matchedMessages.length > 0 || matchedUsers.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b shrink-0">
        <h2 className="text-lg font-semibold mb-3">Поиск</h2>
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по сообщениям и чатам..."
            className="w-full pl-9 pr-4 py-2 bg-[hsl(var(--messenger-received))] rounded-full text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!query && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Icon name="Search" size={48} className="mb-3 opacity-30" />
            <p className="text-sm">Введите запрос для поиска</p>
          </div>
        )}

        {query && !hasResults && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">Ничего не найдено</p>
          </div>
        )}

        {matchedUsers.length > 0 && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Люди
            </p>
            {matchedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[hsl(var(--messenger-hover))] transition-colors"
              >
                <UserAvatar name={user.name} size="sm" isOnline={user.status === "online"} />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.status === "online" ? "в сети" : user.lastSeen || "был(а) недавно"}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {matchedChats.length > 0 && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Чаты
            </p>
            {matchedChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[hsl(var(--messenger-hover))] transition-colors"
              >
                <UserAvatar name={chat.name} size="sm" />
                <div>
                  <p className="text-sm font-medium">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.type === "group" ? "Группа" : chat.type === "conference" ? "Конференция" : "Личный чат"}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {matchedMessages.length > 0 && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Сообщения
            </p>
            {matchedMessages.map((msg) => {
              const chat = chats.find((c) => c.id === msg.chatId);
              return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-[hsl(var(--messenger-hover))] transition-colors"
                >
                  <UserAvatar name={chat?.name || "?"} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{chat?.name}</p>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
