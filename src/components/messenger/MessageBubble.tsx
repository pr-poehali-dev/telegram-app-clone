import { Message } from "@/types/messenger";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const SENDER_COLORS = [
  "text-blue-600",
  "text-emerald-600",
  "text-violet-600",
  "text-orange-600",
  "text-pink-600",
  "text-cyan-600",
];

function getSenderColor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return SENDER_COLORS[sum % SENDER_COLORS.length];
}

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
  showAvatar?: boolean;
  senderName?: string;
}

export default function MessageBubble({ message, isMine, senderName }: MessageBubbleProps) {
  return (
    <div className={cn("flex mb-1 px-3", isMine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] px-3 py-2 rounded-2xl relative",
          isMine
            ? "bg-[hsl(var(--messenger-sent))] rounded-br-sm"
            : "bg-[hsl(var(--messenger-received))] rounded-bl-sm"
        )}
      >
        {senderName && !isMine && (
          <p className={cn("text-xs font-semibold mb-0.5", getSenderColor(senderName))}>
            {senderName}
          </p>
        )}
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <div className={cn("flex items-center gap-1 justify-end mt-0.5", isMine ? "-mb-0.5" : "")}>
          <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
          {isMine && (
            <Icon
              name={message.status === "read" ? "CheckCheck" : "Check"}
              size={13}
              className={cn(
                message.status === "read"
                  ? "text-[hsl(var(--messenger-accent))]"
                  : "text-muted-foreground"
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
