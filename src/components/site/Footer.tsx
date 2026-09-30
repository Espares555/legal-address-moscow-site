export default function Footer() {
  return (
    <footer className="border-t border-line bg-topbar text-topbar-foreground">
      <div className="grid grid-rows-4" aria-hidden="true">
        <div className="h-2 bg-band-1" />
        <div className="h-2 bg-band-2" />
        <div className="h-2 bg-band-3" />
        <div className="h-2 bg-band-4" />
      </div>
      <div className="flex flex-col gap-8 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-14">
        <div>
          <a href="#top" className="font-head text-[40px] font-extrabold tracking-[-0.03em]">
            Меркурий<span className="text-band-1">.</span>
          </a>
          <p className="mt-2 max-w-sm text-topbar-foreground/60">База юридических адресов Москвы для регистрации и смены юрадреса.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-medium text-topbar-foreground/80">
          <a href="#catalog" className="hover:text-band-1">База адресов</a>
          <a href="#map" className="hover:text-band-1">На карте</a>
          <a href="#services" className="hover:text-band-1">Услуги</a>
          <a href="#faq" className="hover:text-band-1">Вопросы</a>
          <a href="#contacts" className="hover:text-band-1">Контакты</a>
        </nav>
        <p className="text-[13px] text-topbar-foreground/50">© 2026 Меркурий. Все права защищены.</p>
      </div>
    </footer>
  );
}
