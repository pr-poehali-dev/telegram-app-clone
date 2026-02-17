import Icon from "@/components/ui/icon";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
}

const navItems = [
  { id: "chats", label: "Чаты", icon: "MessageCircle" },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "search", label: "Поиск", icon: "Search" },
  { id: "archive", label: "Архив", icon: "Archive" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export default function Sidebar({ activeTab, onTabChange, unreadCount = 0 }: SidebarProps) {
  return (
    <div className="hidden md:flex flex-col w-16 lg:w-[200px] border-r bg-[hsl(var(--messenger-sidebar))] shrink-0">
      <div className="flex items-center gap-3 px-3 py-4 border-b">
        <UserAvatar name="Вы" size="sm" isOnline />
        <span className="font-semibold text-sm hidden lg:block">Мессенджер</span>
      </div>

      <nav className="flex-1 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 transition-colors relative",
              activeTab === item.id
                ? "bg-[hsl(var(--messenger-active))] text-[hsl(var(--messenger-accent))]"
                : "text-muted-foreground hover:bg-[hsl(var(--messenger-hover))]"
            )}
          >
            <div className="relative">
              <Icon name={item.icon} size={20} />
              {item.id === "chats" && unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[hsl(var(--messenger-unread))] text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-sm font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
