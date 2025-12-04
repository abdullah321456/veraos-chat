"use client";

import { FaqHelpLinkMenu } from "./link-menu";
import React from "react";
import { usePathname } from "next/navigation";
import { MAP_PAGE_HEADER_TITLE } from "@/config/routes";
import { useDarkMode } from "@/lib/contexts/dark-mode-context";

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  
  // Get the current page title from the mapping
  const getCurrentPageTitle = () => {
    if (MAP_PAGE_HEADER_TITLE[pathname as keyof typeof MAP_PAGE_HEADER_TITLE]) {
      return MAP_PAGE_HEADER_TITLE[pathname as keyof typeof MAP_PAGE_HEADER_TITLE];
    }
    // Default fallback
    return 'FAQ';
  };

  const currentPageTitle = getCurrentPageTitle();

  const containerBg = isDarkMode ? '#404652' : 'white';
  const headerStyle = isDarkMode
    ? { backgroundColor: '#404652', color: '#FFFFFF' }
    : { backgroundColor: 'transparent', color: '#111827' };
  const contentBg = isDarkMode ? '#404652' : 'white';

  return (
    <div 
      className="w-full min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-100px)] sm:rounded-[20px] overflow-hidden flex flex-col sm:pr-6 sm:-mt-[10px]"
      style={{ backgroundColor: containerBg }}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <div className="p-4 sm:p-0 w-full max-w-full min-w-0">
          {/* Header for small devices */}
          <div className="flex justify-between items-center mb-2 flex-shrink-0 w-full sm:hidden">
            <h2 
              className="text-lg font-bold -mb-1 px-2 py-0 rounded-tl-lg rounded-tr-lg w-full"
              style={headerStyle}
            >
              {currentPageTitle}
            </h2>
          </div>

          <FaqHelpLinkMenu />
          <div 
            className="px-4 pt-4 pb-8 sm:p-0 rounded-[10px] sm:rounded-none w-full max-w-full sm:max-w-[450px] sm:mx-auto min-w-0 box-border mt-4 sm:mt-0"
            style={{ backgroundColor: contentBg }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
