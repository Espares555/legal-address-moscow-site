import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ADDRESSES } from "@/data/addresses";

export default function Hero() {
  return (
    <main
      id="top"
      className="mx-3 border border-b-0 border-line bg-surface lg:mx-[18px] lg:grid lg:grid-cols-[420px_1fr]"
    >
      {/* lead */}
      <div className="border-line px-6 pt-8 lg:border-r lg:pb-16 lg:pl-14 lg:pr-0 lg:pt-[58px]">
        <p className="text-[20px] leading-[1.35] tracking-[-0.01em] text-muted-foreground lg:text-[24px]">
          <b className="font-bold text-foreground/80">Держим репутацию</b>
          <br />с 1993 года
        </p>
        <Link to="/about" className="group mt-5 inline-flex items-center gap-2 font-semibold text-primary">
          Подробнее о компании
          <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* head */}
      <div className="flex flex-col gap-5 px-6 pb-8 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-16 lg:pl-14 lg:pr-[60px] lg:pt-9">
        <h1 className="font-head text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] xl:text-[72px]">
          <span className="mb-1.5 block text-[0.54em] leading-[1.08] tracking-[-0.02em]">
            Меркурий —<br />
            база юридических
          </span>
          адресов
          <br />
          Москвы
        </h1>
        <div className="max-w-[300px] space-y-3 pb-2.5 text-[14.5px] leading-[1.6] text-muted-foreground">
          <p>Адреса для регистрации и смены юрадреса. Задайте параметры — покажем объекты списком и на карте.</p>
          <p>
            {ADDRESSES.length} проверенных объектов. Собственник подтверждает адрес, ФНС принимает документы с первого раза.
          </p>
        </div>
      </div>

    </main>
  );
}
