"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { useState, useEffect } from "react";

export function FaqHelpLinkMenu() {
  const pathname = usePathname();
  const [marginTop, setMarginTop] = useState("0");

  useEffect(() => {
    const updateMargin = () => {
      setMarginTop(window.innerWidth >= 640 ? "-8px" : "0");
    };
    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, []);

  return (
    <div className="flex justify-center px-4 sm:px-0 sm:pt-12 w-full min-w-0 overflow-x-hidden" style={{marginTop}}>
      <div className="border border-gray-100 rounded-[10px] shadow-sm p-1 w-full max-w-[400px] min-w-0" style={{ backgroundColor: '#F3F3F5' }}>
        <div className="flex gap-1 items-center justify-center px-1 min-w-0">
          <Link
            href={ROUTES.FAQ.INDEX}
            className={`text-xs font-bold rounded-[10px] py-2 sm:py-3 w-full text-center transition-all min-w-0 flex-shrink ${
              pathname === ROUTES.FAQ.INDEX
                ? "bg-white text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            FAQ
          </Link>
          <Link
            href={ROUTES.FAQ.HELP_CENTER}
            className={`text-xs font-bold rounded-[10px] py-2 sm:py-3 w-full text-center transition-all min-w-0 flex-shrink ${
              pathname === ROUTES.FAQ.HELP_CENTER
                ? "bg-white text-[#5C39D9]"
                : "text-[#616166]"
            }`}>
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
