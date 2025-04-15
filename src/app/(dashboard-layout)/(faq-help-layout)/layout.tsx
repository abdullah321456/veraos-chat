import { FaqHelpLinkMenu } from "./link-menu";

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqHelpLinkMenu />
      {children}
    </>
  );
}
