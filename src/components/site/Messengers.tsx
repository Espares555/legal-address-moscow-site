import Icon from "@/components/ui/icon";

const WHATSAPP = "https://wa.me/74951234567";
const TELEGRAM = "https://t.me/merkuriy_adres";

const LINKS = [
  { href: TELEGRAM, label: "Написать в Telegram", icon: "Send", bg: "bg-[#229ED9]" },
  { href: WHATSAPP, label: "Написать в WhatsApp", icon: "MessageCircle", bg: "bg-[#25D366]" },
];

export default function Messengers() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 lg:bottom-8 lg:right-8">
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className={`group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:scale-105 ${l.bg}`}
        >
          <Icon name={l.icon} size={26} />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-ink px-3 py-1.5 text-[13px] font-semibold text-ink-foreground opacity-0 transition-opacity group-hover:opacity-100 md:block">
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
}
