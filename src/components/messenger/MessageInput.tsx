import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-3 py-2 border-t bg-white">
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
        <Icon name="Paperclip" size={20} />
      </button>
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Сообщение..."
          className="w-full px-4 py-2.5 bg-[hsl(var(--messenger-received))] rounded-full text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Smile" size={20} />
        </button>
      </div>
      {text.trim() ? (
        <button
          onClick={handleSend}
          className="p-2 text-[hsl(var(--messenger-accent))] hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors shrink-0"
        >
          <Icon name="SendHorizontal" size={20} />
        </button>
      ) : (
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
          <Icon name="Mic" size={20} />
        </button>
      )}
    </div>
  );
}
