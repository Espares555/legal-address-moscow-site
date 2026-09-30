import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SERVICES } from "@/data/services";

type NavItem = { href: string; label: string; main?: boolean; menu?: boolean; icon?: string; section?: string; paths?: string[]; noBurger?: boolean };

const NAV: NavItem[] = [
  { href: "/#catalog", label: "База адресов", main: true, section: "catalog", paths: ["/address", "/ifns", "/okrug", "/district", "/metro"] },
  { href: "/#services", label: "Услуги", menu: true, main: true, section: "services", paths: ["/services"] },
  { href: "/about", label: "О нас", main: true, paths: ["/about"] },
  { href: "/#reviews", label: "Отзывы", main: true, section: "reviews" },
  { href: "/faq", label: "Вопросы", main: true, section: "faq", paths: ["/faq"], noBurger: true },
  { href: "/#contacts", label: "Контакты", main: true, section: "contacts" },
  { href: "/#map", label: "На карте", icon: "Map", section: "map" },
  { href: "/articles", label: "Статьи", icon: "BookOpen", section: "articles", paths: ["/articles"] },
];

const EXTRA = NAV.filter((n) => !n.main);
const SECTIONS = NAV.map((n) => n.section).filter(Boolean) as string[];

function useActive() {
  const { pathname } = useLocation();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let cur: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) cur = id;
      }
      setSection(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (n: NavItem) =>
    pathname === "/" ? !!n.section && n.section === section : !!n.paths?.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

type Props = { onPick: () => void };

export default function Header({ onPick }: Props) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const isActive = useActive();
  const { pathname } = useLocation();
  const extraActive = EXTRA.some(isActive);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (window.innerWidth >= 1280 && moreRef.current && !moreRef.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <>
      <a
        href="/#catalog"
        className="flex h-10 items-center justify-center gap-3 bg-topbar px-4 text-center text-[15px] font-medium text-topbar-foreground"
      >
        <span className="truncate">Новые адреса в ЦАО — уже в базе</span>
        <span className="grid h-7 w-7 flex-none place-items-center rounded-md border border-topbar-foreground/45 bg-topbar-foreground/10">
          <Icon name="ArrowRight" size={12} />
        </span>
      </a>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="flex h-[72px] items-center px-5 lg:px-9">
          <a href="/#top" className="font-head text-[26px] font-extrabold tracking-[-0.03em]">
            Меркурий<span className="text-primary">.</span>
          </a>

          <nav className="mx-auto hidden items-center gap-8 text-[15.5px] font-medium xl:flex">
            {NAV.filter((n) => n.main).map((n) =>
              n.menu ? (
                <div key={n.href} className="group relative">
                  <a
                    href={n.href}
                    aria-current={isActive(n) ? "page" : undefined}
                    className={`relative inline-flex items-center gap-1 transition-colors hover:text-primary group-hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all ${isActive(n) ? "text-primary after:w-full" : "after:w-0"}`}
                  >
                    {n.label}
                    <Icon name="ChevronDown" size={15} className="transition-transform group-hover:rotate-180" />
                  </a>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[380px] -translate-x-1/2 pt-5 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-line bg-background shadow-xl">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className={`group/item flex items-center gap-3.5 border-b border-line px-5 py-3.5 transition-colors last:border-b-0 hover:bg-surface ${pathname === `/services/${s.slug}` ? "bg-surface" : ""}`}
                        >
                          <span className="grid h-9 w-9 flex-none place-items-center bg-surface text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                            <Icon name={s.icon} size={17} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14.5px] font-semibold leading-snug group-hover/item:text-primary">{s.name}</span>
                            <span className="text-[12.5px] text-muted-foreground">{s.price}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n) ? "page" : undefined}
                  className={`relative transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full ${isActive(n) ? "text-primary after:w-full" : "after:w-0"}`}
                >
                  {n.label}
                </a>
              ),
            )}
            <div ref={moreRef} className="relative">
              <button
                aria-label="Ещё"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={`relative grid h-10 w-10 place-items-center border transition-colors ${open ? "border-primary bg-primary text-primary-foreground" : extraActive ? "border-primary text-primary" : "border-line hover:border-primary hover:text-primary"}`}
              >
                <Icon name={open ? "X" : "Menu"} size={20} />
                {extraActive && !open && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />}
              </button>
              {open && (
                <div className="animate-fade-in absolute right-0 top-full z-50 mt-4 w-[260px] border border-line bg-background shadow-xl">
                  {EXTRA.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(n) ? "page" : undefined}
                      className={`flex items-center gap-3 border-b border-l-[3px] border-b-line px-5 py-3.5 font-semibold transition-colors last:border-b-0 hover:bg-surface hover:text-primary ${isActive(n) ? "border-l-primary bg-surface text-primary" : "border-l-transparent"}`}
                    >
                      <Icon name={n.icon ?? "ArrowUpRight"} size={17} className="text-primary" />
                      {n.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
              {NAV.filter((n) => !n.noBurger).map((n) =>
                n.menu ? (
                  <div key={n.href} className="border-b border-line">
                    <button onClick={() => setSub((v) => !v)} className={`flex w-full items-center justify-between py-4 font-head text-xl font-bold ${isActive(n) ? "text-primary" : ""}`}>
                      {n.label}
                      <Icon name="ChevronDown" size={20} className={`text-primary transition-transform ${sub ? "rotate-180" : ""}`} />
                    </button>
                    {sub && (
                      <div className="flex flex-col pb-3">
                        {SERVICES.map((s) => (
                          <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setOpen(false)} className={`flex items-center gap-3 py-2.5 font-medium ${pathname === `/services/${s.slug}` ? "text-primary" : ""}`}>
                            <Icon name={s.icon} size={17} className="text-primary" />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(n) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line py-4 font-head text-xl font-bold ${isActive(n) ? "text-primary" : ""}`}
                >
                  {n.label}
                  <Icon name="ArrowUpRight" size={18} className="text-primary" />
                </a>
                ),
              )}
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
