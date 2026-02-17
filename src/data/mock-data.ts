import { User, Message, Chat, Contact } from "@/types/messenger";

export const currentUser: User = {
  id: "me",
  name: "Вы",
  status: "online",
};

export const users: User[] = [
  { id: "u1", name: "Алексей Петров", status: "online" },
  { id: "u2", name: "Мария Иванова", status: "recently", lastSeen: "была 15 мин назад" },
  { id: "u3", name: "Дмитрий Козлов", status: "online" },
  { id: "u4", name: "Елена Смирнова", status: "offline", lastSeen: "была вчера" },
  { id: "u5", name: "Андрей Волков", status: "online" },
  { id: "u6", name: "Наталья Морозова", status: "recently", lastSeen: "была 1 час назад" },
  { id: "u7", name: "Сергей Новиков", status: "offline", lastSeen: "был 3 дня назад" },
  { id: "u8", name: "Анна Лебедева", status: "online" },
];

export const messages: Message[] = [
  { id: "m1", chatId: "c1", senderId: "u1", text: "Привет! Как дела с проектом?", timestamp: "14:32", status: "read" },
  { id: "m2", chatId: "c1", senderId: "me", text: "Привет! Всё отлично, заканчиваю дизайн", timestamp: "14:33", status: "read" },
  { id: "m3", chatId: "c1", senderId: "u1", text: "Супер! Покажешь вечером?", timestamp: "14:34", status: "read" },
  { id: "m4", chatId: "c1", senderId: "me", text: "Да, скину макеты после обеда", timestamp: "14:35", status: "delivered" },

  { id: "m5", chatId: "c2", senderId: "u2", text: "Отправила тебе документы на почту", timestamp: "13:10", status: "read" },
  { id: "m6", chatId: "c2", senderId: "me", text: "Спасибо, посмотрю сегодня", timestamp: "13:15", status: "read" },
  { id: "m7", chatId: "c2", senderId: "u2", text: "Там нужна подпись до пятницы", timestamp: "13:16", status: "read" },

  { id: "m8", chatId: "c3", senderId: "u3", text: "Го в кино в субботу?", timestamp: "12:00", status: "read" },
  { id: "m9", chatId: "c3", senderId: "me", text: "Давай! Что смотрим?", timestamp: "12:05", status: "read" },

  { id: "m10", chatId: "c4", senderId: "u4", text: "Спасибо за помощь!", timestamp: "вчера", status: "read" },

  { id: "m11", chatId: "c5", senderId: "u5", text: "Встреча перенесена на среду", timestamp: "вчера", status: "read" },

  { id: "m12", chatId: "c6", senderId: "u1", text: "Коллеги, завтра дедлайн по ТЗ", timestamp: "15:00", status: "read" },
  { id: "m13", chatId: "c6", senderId: "u3", text: "Я почти закончил свою часть", timestamp: "15:05", status: "read" },
  { id: "m14", chatId: "c6", senderId: "me", text: "Мне нужно ещё пару часов", timestamp: "15:10", status: "delivered" },
  { id: "m15", chatId: "c6", senderId: "u5", text: "Давайте созвонимся в 17:00", timestamp: "15:12", status: "read" },

  { id: "m16", chatId: "c7", senderId: "u8", text: "Кто идёт на шашлыки в выходные? 🍖", timestamp: "11:30", status: "read" },
  { id: "m17", chatId: "c7", senderId: "u3", text: "Я с Леной приду!", timestamp: "11:35", status: "read" },
  { id: "m18", chatId: "c7", senderId: "me", text: "Я тоже буду, что брать?", timestamp: "11:40", status: "read" },

  { id: "m19", chatId: "c8", senderId: "u6", text: "Презентация готова, можем начинать", timestamp: "пн", status: "read" },
  { id: "m20", chatId: "c8", senderId: "u1", text: "Отлично, подключаюсь через 5 минут", timestamp: "пн", status: "read" },
];

export const chats: Chat[] = [
  {
    id: "c1",
    type: "private",
    name: "Алексей Петров",
    participants: ["me", "u1"],
    lastMessage: messages.find((m) => m.id === "m4"),
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c6",
    type: "group",
    name: "Рабочая группа",
    participants: ["me", "u1", "u3", "u5", "u6"],
    lastMessage: messages.find((m) => m.id === "m15"),
    unreadCount: 3,
    isPinned: true,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c2",
    type: "private",
    name: "Мария Иванова",
    participants: ["me", "u2"],
    lastMessage: messages.find((m) => m.id === "m7"),
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c7",
    type: "group",
    name: "Друзья",
    participants: ["me", "u3", "u4", "u8"],
    lastMessage: messages.find((m) => m.id === "m18"),
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    isMuted: true,
  },
  {
    id: "c3",
    type: "private",
    name: "Дмитрий Козлов",
    participants: ["me", "u3"],
    lastMessage: messages.find((m) => m.id === "m9"),
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c5",
    type: "private",
    name: "Андрей Волков",
    participants: ["me", "u5"],
    lastMessage: messages.find((m) => m.id === "m11"),
    unreadCount: 2,
    isPinned: false,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c8",
    type: "conference",
    name: "Конференция проекта",
    participants: ["me", "u1", "u2", "u3", "u5", "u6"],
    lastMessage: messages.find((m) => m.id === "m20"),
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    isMuted: false,
  },
  {
    id: "c4",
    type: "private",
    name: "Елена Смирнова",
    participants: ["me", "u4"],
    lastMessage: messages.find((m) => m.id === "m10"),
    unreadCount: 0,
    isPinned: false,
    isArchived: true,
    isMuted: false,
  },
];

export const contacts: Contact[] = users.map((user, i) => ({
  id: `contact-${user.id}`,
  user,
  isFavorite: i < 3,
}));
