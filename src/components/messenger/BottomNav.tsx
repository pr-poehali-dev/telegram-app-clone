import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
}

const tabs = [
  { id: "chats", label: "Чаты", icon: "MessageCircle" },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "search", label: "Поиск", icon: "Search" },
  { id: "archive", label: "Архив", icon: "Archive" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export default function BottomNav({ activeTab, onTabChange, unreadCount = 0 }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around border-t bg-white py-1 md:hidden shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors relative",
            activeTab === tab.id ? "text-[hsl(var(--messenger-accent))]" : "text-muted-foreground"
          )}
        >
          <div className="relative">
            <Icon name={tab.icon} size={20} />
            {tab.id === "chats" && unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[hsl(var(--messenger-unread))] text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
