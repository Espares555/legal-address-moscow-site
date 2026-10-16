type Props = { size?: number; className?: string };

export default function LogoMark({ size = 32, className = "" }: Props) {
  return <img src="/favicon.svg" alt="" width={size} height={size} className={`flex-none ${className}`} />;
}
