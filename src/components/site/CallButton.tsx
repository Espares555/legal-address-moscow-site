import Icon from "@/components/ui/icon";
import { PHONE } from "@/lib/seo";

export default function CallButton() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <a
        href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-head text-base font-bold text-primary-foreground shadow-lg"
      >
        <Icon name="Phone" size={20} />
        Позвонить
      </a>
    </div>
  );
}
