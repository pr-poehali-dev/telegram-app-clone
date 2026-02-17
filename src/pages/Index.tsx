import { useState } from "react";
import { chats } from "@/data/mock-data";
import Sidebar from "@/components/messenger/Sidebar";
import BottomNav from "@/components/messenger/BottomNav";
import ChatList from "@/components/messenger/ChatList";
import ChatView from "@/components/messenger/ChatView";
import ContactsView from "@/components/messenger/ContactsView";
import SearchView from "@/components/messenger/SearchView";
import ArchiveView from "@/components/messenger/ArchiveView";
import SettingsView from "@/components/messenger/SettingsView";
import EmptyChat from "@/components/messenger/EmptyChat";
import { cn } from "@/lib/utils";

export default function Index() {
  const [activeTab, setActiveTab] = useState("chats");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const totalUnread = chats
    .filter((c) => !c.isArchived)
    .reduce((sum, c) => sum + c.unreadCount, 0);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleBack = () => {
    setActiveChatId(null);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case "chats":
        return (
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            onChatSelect={handleChatSelect}
          />
        );
      case "contacts":
        return <ContactsView />;
      case "search":
        return <SearchView />;
      case "archive":
        return <ArchiveView onChatSelect={handleChatSelect} />;
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-white">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadCount={totalUnread}
      />

      <div
        className={cn(
          "w-full md:w-80 lg:w-96 border-r flex flex-col shrink-0",
          activeChatId ? "hidden md:flex" : "flex"
        )}
      >
        {renderPanel()}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadCount={totalUnread}
        />
      </div>

      <div
        className={cn(
          "flex-1 flex flex-col",
          activeChatId ? "flex" : "hidden md:flex"
        )}
      >
        {activeChat ? (
          <ChatView chat={activeChat} onBack={handleBack} />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}
