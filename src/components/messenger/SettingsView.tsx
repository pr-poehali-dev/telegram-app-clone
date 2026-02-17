import UserAvatar from "./UserAvatar";
import Icon from "@/components/ui/icon";

const settingsGroups = [
  {
    items: [
      { icon: "Bell", label: "Уведомления", desc: "Звуки и оповещения" },
      { icon: "Lock", label: "Конфиденциальность", desc: "Последняя активность, фото" },
      { icon: "Palette", label: "Оформление", desc: "Тема, фон чата, размер шрифта" },
      { icon: "Globe", label: "Язык", desc: "Русский" },
    ],
  },
  {
    items: [
      { icon: "HardDrive", label: "Данные и память", desc: "Использование сети, автозагрузка" },
      { icon: "Smartphone", label: "Устройства", desc: "1 активное устройство" },
    ],
  },
  {
    items: [
      { icon: "CircleHelp", label: "Помощь", desc: "FAQ и поддержка" },
      { icon: "Info", label: "О приложении", desc: "Версия 1.0.0" },
    ],
  },
];

export default function SettingsView() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b shrink-0">
        <h2 className="text-lg font-semibold">Настройки</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="flex items-center gap-4 px-4 py-5 border-b">
          <UserAvatar name="Вы" size="lg" isOnline />
          <div>
            <p className="font-semibold">Мой профиль</p>
            <p className="text-sm text-muted-foreground">Установить фото и имя</p>
          </div>
          <button className="ml-auto p-2 hover:bg-[hsl(var(--messenger-hover))] rounded-full transition-colors">
            <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {settingsGroups.map((group, gi) => (
          <div key={gi} className="border-b last:border-b-0">
            {group.items.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[hsl(var(--messenger-hover))] transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[hsl(var(--messenger-received))] flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={18} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
