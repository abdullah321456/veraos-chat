"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FaqHelpLinkMenu() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <div className="border border-gray-100 rounded-[37px] shadow-sm p-1 w-[257px]">
        <div className="flex gap-1 items-center justify-between px-1">
          <Link
            href="/faq"
            className={`text-xs font-bold rounded-[37px] py-3 w-1/2 text-center transition-all ${
              pathname === "/faq"
                ? "bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            FAQ
          </Link>
          <Link
            href="/help-center"
            className={`text-xs font-bold rounded-[37px] py-3 w-1/2 text-center transition-all ${
              pathname === "/help-center"
                ? "bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
