import { Chat } from "@/types/messenger";
import UserAvatar from "./UserAvatar";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export default function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  const lastMsg = chat.lastMessage;
  const isMine = lastMsg?.senderId === "me";

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left",
        isActive
          ? "bg-[hsl(var(--messenger-active))]"
          : "hover:bg-[hsl(var(--messenger-hover))]"
      )}
    >
      <div className="relative">
        <UserAvatar
          name={chat.name}
          size="md"
          isOnline={chat.type === "private" ? undefined : undefined}
        />
        {chat.type !== "private" && (
          <span className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
            <Icon
              name={chat.type === "group" ? "Users" : "Video"}
              size={12}
              className="text-muted-foreground"
            />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            {chat.isPinned && (
              <Icon name="Pin" size={12} className="text-muted-foreground shrink-0 rotate-45" />
            )}
            <span className="font-medium text-sm truncate">{chat.name}</span>
          </div>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">
            {lastMsg?.timestamp}
          </span>
        </div>

        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {isMine && (
              <Icon
                name={lastMsg.status === "read" ? "CheckCheck" : "Check"}
                size={14}
                className={cn(
                  "shrink-0",
                  lastMsg.status === "read" ? "text-[hsl(var(--messenger-accent))]" : "text-muted-foreground"
                )}
              />
            )}
            <span className="text-sm text-muted-foreground truncate">
              {chat.type !== "private" && !isMine && lastMsg
                ? `${lastMsg.senderId === "me" ? "Вы" : lastMsg.senderId}: `
                : ""}
              {lastMsg?.text || "Нет сообщений"}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            {chat.isMuted && (
              <Icon name="BellOff" size={14} className="text-muted-foreground" />
            )}
            {chat.unreadCount > 0 && (
              <span className="bg-[hsl(var(--messenger-unread))] text-white text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
