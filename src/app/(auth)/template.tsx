export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mx-auto max-w-[1024px] p-10 flex items-center justify-center ">
      <div>{children}</div>
    </div>
  );
}
