import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RequestForm from "./RequestForm";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  subject?: string;
};

export default function RequestDialog({ open, onOpenChange, subject }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none border-line p-0 sm:rounded-none">
        <div className="grid grid-rows-4" aria-hidden="true">
          <div className="h-1.5 bg-band-1" />
          <div className="h-1.5 bg-band-2" />
          <div className="h-1.5 bg-band-3" />
          <div className="h-1.5 bg-band-4" />
        </div>
        <div className="px-7 pb-7 pt-4">
          <DialogHeader className="mb-5 text-left">
            <DialogTitle className="font-head text-[28px] font-extrabold tracking-[-0.02em]">Подобрать адрес</DialogTitle>
            <DialogDescription>Оставьте телефон — перезвоним и предложим свободные адреса под вашу задачу.</DialogDescription>
          </DialogHeader>
          <RequestForm subject={subject} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
