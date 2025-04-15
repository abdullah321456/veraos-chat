'use client';
import { ROUTES } from '@/config/routes';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  return (
    <div className="w-[220px] bg-white p-4">
      <ul className="space-y-7 pl-5 border-l-[2px] border-l-black/10 py-2">
        {settingsMenuItems.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className={cn(
                'text-xs font-medium duration-300 relative',
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
  );
}
