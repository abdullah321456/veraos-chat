export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden mx-auto max-w-[1024px] w-full max-w-full px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:p-10 flex items-center justify-center box-border">
      <div className="w-full max-w-full min-w-0 box-border">{children}</div>
    </div>
  );
}
