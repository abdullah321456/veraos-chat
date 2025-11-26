import { SettingsLinkMenu } from "./link-menu";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto" style={{ minHeight: 'calc(100vh - 20vh)' }}>
      {/* Mobile: Tabs at top */}
      <div className="block sm:hidden">
        <SettingsLinkMenu />
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Desktop: Sidebar and content side by side */}
      <div className="hidden sm:flex justify-center">
        <SettingsLinkMenu />
        {children}
      </div>
    </div>
  );
}
