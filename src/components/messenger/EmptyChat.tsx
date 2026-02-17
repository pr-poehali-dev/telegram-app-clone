import Icon from "@/components/ui/icon";

export default function EmptyChat() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full bg-[hsl(var(--messenger-sidebar))]">
      <div className="w-20 h-20 rounded-full bg-[hsl(var(--messenger-received))] flex items-center justify-center mb-4">
        <Icon name="MessageCircle" size={36} className="text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-sm">Выберите чат, чтобы начать общение</p>
    </div>
  );
}
