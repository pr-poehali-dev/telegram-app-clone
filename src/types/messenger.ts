export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "recently";
  lastSeen?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  replyTo?: string;
}

export interface Chat {
  id: string;
  type: "private" | "group" | "conference";
  name: string;
  avatar?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  isMuted: boolean;
}

export interface Contact {
  id: string;
  user: User;
  isFavorite: boolean;
}
