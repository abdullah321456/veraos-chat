import { FaqHelpLinkMenu } from "./link-menu";
import React from "react";

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className="flex justify-between items-center mb-2 flex-shrink-0 w-full sm:hidden">
            <h2 className="text-lg font-bold -mb-1 px-2 py-0 bg-transparent rounded-tl-lg rounded-tr-lg w-full">Terms of Use</h2>
        </div>

        <FaqHelpLinkMenu />
      {children}
    </>
  );
}
