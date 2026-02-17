import { chats } from "@/data/mock-data";
import ChatListItem from "./ChatListItem";
import Icon from "@/components/ui/icon";

interface ArchiveViewProps {
  onChatSelect: (chatId: string) => void;
}

export default function ArchiveView({ onChatSelect }: ArchiveViewProps) {
  const archivedChats = chats.filter((c) => c.isArchived);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b shrink-0">
        <h2 className="text-lg font-semibold">Архив</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {archivedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Icon name="Archive" size={48} className="mb-3 opacity-30" />
            <p className="text-sm">Архив пуст</p>
          </div>
        ) : (
          archivedChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={false}
              onClick={() => onChatSelect(chat.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
