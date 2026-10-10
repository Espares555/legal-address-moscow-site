export default function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center bg-band-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink ${className}`}>
      Новый
    </span>
  );
}
