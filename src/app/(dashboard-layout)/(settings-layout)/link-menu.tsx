'use client';
import { ROUTES } from '@/config/routes';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

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
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 640) {
        setBackgroundColor(isDarkMode ? '#404652' : '#F6F6F9');
      } else {
        setBackgroundColor(undefined);
      }
    };
    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, [isDarkMode]);

  const mobileBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB';
  const desktopBg = isDarkMode ? '#404652' : 'white';
  const desktopBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const inactiveTextColor = isDarkMode ? '#FFFFFF' : '#4B5563';
  const activeTextColor = isDarkMode ? '#FFFFFF' : '#5C39D9';
  const inactiveHoverColor = isDarkMode ? '#C0AEFF' : undefined;

  return (
    <>
      {/* Mobile: Horizontal tabs at top */}
      <div 
        className="block sm:hidden w-full border-b overflow-x-auto" 
        style={{ backgroundColor, borderColor: mobileBorderColor }}
      >
        <div className="flex gap-4 px-4 py-3 min-w-max">
          {settingsMenuItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={cn(
                'text-xs font-medium duration-300 pb-2 border-b-2 whitespace-nowrap',
                pathname === href 
                  ? 'font-semibold border-primary' 
                  : 'border-transparent'
              )}
              style={pathname === href 
                ? { color: activeTextColor, borderColor: '#5C39D9' }
                : { color: inactiveTextColor }
              }
              onMouseEnter={(e) => {
                if (pathname !== href) {
                  e.currentTarget.style.color = isDarkMode ? '#C0AEFF' : '#5C39D9';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== href) {
                  e.currentTarget.style.color = inactiveTextColor;
                }
              }}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical sidebar menu */}
      <div 
        className="hidden sm:block w-[220px] p-4"
        style={{ backgroundColor: desktopBg }}
      >
        <ul 
          className="space-y-7 pl-5 border-l-[2px] py-2 flex flex-col items-center"
          style={{ borderColor: desktopBorderColor }}
        >
          {settingsMenuItems.map(({ name, href }) => (
            <li key={name} className="w-full text-center">
              <Link
                href={href}
                className={cn(
                  'text-xs font-medium duration-300 relative inline-block',
                  pathname === href && 'after:absolute after:h-5 after:w-0.5 after:bg-primary after:-top-0.5 after:-left-[22px]'
                )}
                style={pathname === href 
                  ? { color: activeTextColor }
                  : { color: inactiveTextColor }
                }
                onMouseEnter={(e) => {
                  if (pathname !== href) {
                    e.currentTarget.style.color = isDarkMode ? '#C0AEFF' : '#5C39D9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== href) {
                    e.currentTarget.style.color = inactiveTextColor;
                  }
                }}
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
