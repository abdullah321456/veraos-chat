"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

export function FaqHelpLinkMenu() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <div className="border border-gray-100 rounded-[37px] shadow-sm p-1 w-[200px]">
        <div className="flex gap-1 items-center justify-center px-1">
          <Link
            href={ROUTES.FAQ.TERMS_OF_USE}
            className={`text-xs font-bold rounded-[37px] py-3 w-full text-center transition-all ${
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
