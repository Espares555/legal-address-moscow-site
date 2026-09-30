import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV = [
  { href: "#catalog", label: "База адресов" },
  { href: "#map", label: "На карте" },
  { href: "#services", label: "Услуги и цены" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

type Props = { onPick: () => void };

export default function Header({ onPick }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#catalog"
        className="flex h-10 items-center justify-center gap-3 bg-topbar px-4 text-center text-[15px] font-medium text-topbar-foreground"
      >
        <span className="truncate">Новые адреса в ЦАО — уже в базе</span>
        <span className="grid h-7 w-7 flex-none place-items-center rounded-md border border-topbar-foreground/45 bg-topbar-foreground/10">
          <Icon name="ArrowRight" size={12} />
        </span>
      </a>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="flex h-[72px] items-center px-5 lg:px-9">
          <a href="#top" className="font-head text-[26px] font-extrabold tracking-[-0.03em]">
            Меркурий<span className="text-primary">.</span>
          </a>

          <nav className="mx-auto hidden gap-8 text-[15.5px] font-medium xl:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="relative transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-7 text-[15.5px] font-medium md:flex xl:ml-0">
            <a href="tel:+74951234567" className="transition-colors hover:text-primary">
              +7 495 123-45-67
            </a>
            <button
              onClick={onPick}
              className="inline-flex h-11 items-center rounded-sm bg-primary px-[18px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Подобрать адрес
            </button>
          </div>

          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="ml-4 grid h-11 w-11 place-items-center border border-line xl:hidden max-md:ml-auto"
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {open && (
          <div className="animate-fade-in border-t border-line bg-background px-5 pb-6 xl:hidden">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-4 font-head text-xl font-bold"
                >
                  {n.label}
                  <Icon name="ArrowUpRight" size={18} className="text-primary" />
                </a>
              ))}
            </nav>
            <button
              onClick={() => {
                setOpen(false);
                onPick();
              }}
              className="mt-5 h-12 w-full rounded-sm bg-primary font-semibold text-primary-foreground md:hidden"
            >
              Подобрать адрес
            </button>
          </div>
        )}
      </header>
    </>
  );
}
