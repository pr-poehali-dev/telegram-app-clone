import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
];

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  avatar?: string;
}

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2);
}

function getColor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return COLORS[sum % COLORS.length];
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const dotSizes = {
  sm: "h-2.5 w-2.5 border-[1.5px]",
  md: "h-3 w-3 border-2",
  lg: "h-3.5 w-3.5 border-2",
};

export default function UserAvatar({ name, size = "md", isOnline, avatar }: UserAvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <Avatar className={cn(sizes[size])}>
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback className={cn(getColor(name), "text-white font-medium")}>
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-[hsl(var(--messenger-online))] border-white",
            dotSizes[size]
          )}
        />
      )}
    </div>
  );
}
