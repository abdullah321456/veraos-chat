'use client';
import { ROUTES } from '@/config/routes';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const settingsMenuItems = [
  { name: 'Account Settings', href: ROUTES.SETTINGS.ACCOUNT },
  { name: 'Search Preferences', href: ROUTES.SETTINGS.SEARCH_PREFERENCE },
  { name: 'Privacy & Security', href: ROUTES.SETTINGS.PRIVACY_SECURITY },
  {
    name: 'Notifications & Alerts',
    href: ROUTES.SETTINGS.NOTIFICATIONS_ALERTS,
  },
  // {
  //   name: 'Advanced AI & Analysis',
  //   href: ROUTES.SETTINGS.ADVANCED_AI_ANALYSIS,
  // },
  // {
  //   name: 'Data Visualization & Export',
  //   href: ROUTES.SETTINGS.DATA_VISUALIZATION,
  // },
];
export function SettingsLinkMenu() {
  const pathname = usePathname();
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
    <>
      {/* Mobile: Horizontal tabs at top */}
      <div className="block sm:hidden w-full border-b border-gray-200 overflow-x-auto" style={{ backgroundColor }}>
        <div className="flex gap-4 px-4 py-3 min-w-max">
          {settingsMenuItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={cn(
                'text-xs font-medium duration-300 pb-2 border-b-2 whitespace-nowrap',
                pathname === href 
                  ? 'text-primary font-semibold border-primary' 
                  : 'text-gray-600 hover:text-primary border-transparent'
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical sidebar menu */}
      <div className="hidden sm:block w-[220px] bg-white p-4">
        <ul className="space-y-7 pl-5 border-l-[2px] border-l-black/10 py-2 flex flex-col items-center">
          {settingsMenuItems.map(({ name, href }) => (
            <li key={name} className="w-full text-center">
              <Link
                href={href}
                className={cn(
                  'text-xs font-medium duration-300 relative inline-block',
                  pathname === href ? 'text-primary font-semibold' : 'text-black hover:text-primary',
                  pathname === href && 'after:absolute after:h-5 after:w-0.5 after:bg-primary after:-top-0.5 after:-left-[22px]'
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
