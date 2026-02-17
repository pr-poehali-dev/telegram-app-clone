import { Chat } from "@/types/messenger";
import { users } from "@/data/mock-data";
import UserAvatar from "./UserAvatar";
import Icon from "@/components/ui/icon";

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
  onInfo: () => void;
}

function getChatStatus(chat: Chat) {
  if (chat.type === "group") return `${chat.participants.length} участников`;
  if (chat.type === "conference") return `Конференция · ${chat.participants.length} участников`;
  const otherUserId = chat.participants.find((p) => p !== "me");
  const user = users.find((u) => u.id === otherUserId);
  if (!user) return "";
  if (user.status === "online") return "в сети";
  return user.lastSeen || "был(а) недавно";
}

function isOnline(chat: Chat) {
  if (chat.type !== "private") return false;
  const otherUserId = chat.participants.find((p) => p !== "me");
  const user = users.find((u) => u.id === otherUserId);
  return user?.status === "online";
}

export default function ChatHeader({ chat, onBack, onInfo }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-2 border-b bg-white shrink-0">
      <button
        onClick={onBack}
        className="p-2 hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors md:hidden"
      >
        <Icon name="ArrowLeft" size={20} />
      </button>

      <button onClick={onInfo} className="flex items-center gap-3 flex-1 min-w-0">
        <UserAvatar name={chat.name} size="sm" isOnline={isOnline(chat)} />
        <div className="min-w-0 text-left">
          <p className="font-medium text-sm truncate">{chat.name}</p>
          <p className="text-xs text-muted-foreground truncate">{getChatStatus(chat)}</p>
        </div>
      </button>

      <div className="flex items-center shrink-0">
        <button className="p-2 hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors">
          <Icon name="Search" size={18} className="text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors">
          <Icon name="Phone" size={18} className="text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors">
          <Icon name="MoreVertical" size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
