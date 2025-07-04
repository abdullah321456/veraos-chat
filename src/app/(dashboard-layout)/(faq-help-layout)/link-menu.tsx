"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

export function FaqHelpLinkMenu() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <div className="border border-gray-100 rounded-[37px] shadow-sm p-1 w-[380px]">
        <div className="flex gap-1 items-center justify-between px-1">
          <Link
            href={ROUTES.FAQ.INDEX}
            className={`text-xs font-bold rounded-[37px] py-3 w-1/3 text-center transition-all ${
              pathname === ROUTES.FAQ.INDEX
                ? "bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            FAQ
          </Link>
          <Link
            href={ROUTES.FAQ.HELP_CENTER}
            className={`text-xs font-bold rounded-[37px] py-3 w-1/3 text-center transition-all ${
              pathname === ROUTES.FAQ.HELP_CENTER
                ? "bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            Help Center
          </Link>
          <Link
            href={ROUTES.FAQ.TERMS_OF_USE}
            className={`text-xs font-bold rounded-[37px] py-3 w-1/3 text-center transition-all ${
              pathname === ROUTES.FAQ.TERMS_OF_USE
                ? "bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  );
}
