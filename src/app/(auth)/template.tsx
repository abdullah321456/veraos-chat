export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mx-auto max-w-[1024px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:p-10 flex items-center justify-center ">
      <div className="w-full">{children}</div>
    </div>
  );
}
