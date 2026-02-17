import { useState } from "react";
import { contacts } from "@/data/mock-data";
import UserAvatar from "./UserAvatar";
import Icon from "@/components/ui/icon";

export default function ContactsView() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const favorites = filtered.filter((c) => c.isFavorite);
  const others = filtered.filter((c) => !c.isFavorite);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b shrink-0">
        <h2 className="text-lg font-semibold mb-3">Контакты</h2>
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
            placeholder="Найти контакт..."
            className="w-full pl-9 pr-4 py-2 bg-[hsl(var(--messenger-received))] rounded-full text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {favorites.length > 0 && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Избранные
            </p>
            {favorites.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </>
        )}
        {others.length > 0 && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Все контакты
            </p>
            {others.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function ContactItem({ contact }: { contact: (typeof contacts)[number] }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[hsl(var(--messenger-hover))] transition-colors text-left">
      <UserAvatar
        name={contact.user.name}
        size="md"
        isOnline={contact.user.status === "online"}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{contact.user.name}</p>
        <p className="text-xs text-muted-foreground">
          {contact.user.status === "online"
            ? "в сети"
            : contact.user.lastSeen || "был(а) недавно"}
        </p>
      </div>
      {contact.isFavorite && (
        <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400 shrink-0" />
      )}
    </button>
  );
}
