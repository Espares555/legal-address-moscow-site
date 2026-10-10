import { Address, formatPrice } from "@/data/addresses";

type Props = { a: Address; size?: "lg" | "md"; withTerm?: boolean };

export default function AddressPrice({ a, size = "md", withTerm }: Props) {
  if (!a.available) {
    return <span className={`font-semibold leading-tight text-muted-foreground ${size === "lg" ? "text-[15px]" : "text-[13px]"}`}>Временно не предоставляется</span>;
  }
  return (
    <span className={`font-head font-extrabold ${size === "lg" ? "text-[24px] tracking-[-0.02em]" : "text-[18px]"}`}>
      <span className="font-body text-[13px] font-medium tracking-normal text-muted-foreground">от </span>
      {formatPrice(a.price)} ₽
      {withTerm && <span className="font-body text-[12px] font-medium tracking-normal text-muted-foreground"> / {a.term}</span>}
    </span>
  );
}
