'use client';

import { SettingsLinkMenu } from "./link-menu";
import { useState, useEffect } from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateBackground = () => {
      setBackgroundColor(window.innerWidth < 640 ? '#F6F6F9' : undefined);
    };
    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-100px)] sm:rounded-[20px] sm:bg-white overflow-hidden flex flex-col
    sm:pr-6" style={{ backgroundColor }}>
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Header for small devices */}
        <div className="flex justify-between items-center mb-2 flex-shrink-0 w-full sm:hidden" style={{ marginBottom: '8px' }}>
          <h2 className="text-lg font-bold -mb-1 px-2 py-0 bg-transparent rounded-tl-lg rounded-tr-lg w-full">Settings</h2>
        </div>
      {/* Mobile: Tabs at top */}
      <div className="block sm:hidden">
        <SettingsLinkMenu />
        <div className="w-full">
          {children}
        </div>
      </div>

        {/* Desktop: Sidebar and content side by side, centered */}
        <div className="hidden sm:flex justify-center items-start">
        <SettingsLinkMenu />
          <div className="flex-shrink-0">
        {children}
          </div>
        </div>
      </div>
    </div>
  );
}
