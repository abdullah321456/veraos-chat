import cn from '@/lib/utils/cn';

export function FadeAnimation({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('animate-fade animate-duration-[1000ms] animate-iteration-once w-full min-w-0', className)}>{children}</div>;
}
