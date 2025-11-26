import cn from "@/lib/utils/cn";

type Props = {
  title: string;
  className?: string;
  subtitle?: string;
};

export function AuthPageHeader({ title, className, subtitle }: Props) {
  return (
    <div className={cn("text-center", subtitle ? "mb-4 sm:mb-6" : "mb-6 sm:mb-8")}>
      <h1 className={cn("text-xl sm:text-2xl font-bold", className)}>{title}</h1>
      {subtitle && (
        <p className="text-xs sm:text-sm font-normal text-[#808080] mt-2">{subtitle}</p>
      )}
    </div>
  );
}
