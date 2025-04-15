import { SettingsLinkMenu } from "./link-menu";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" mx-auto  flex  justify-center"
    style={{ minHeight: 'calc(100vh - 20vh)' }}>
      <SettingsLinkMenu />
      {children}
    </div>
  );
}
