'use client';

import { ROUTES } from '@/config/routes';
import useQueryParams from '@/lib/hooks/use-query-params';
import { getIsSidebarExpandedOnClient, IsExpandedType, useSidebarExpand } from '@/lib/hooks/use-sidebar-expand';
import cn from '@/lib/utils/cn';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BoxIcon } from './atom/icons/side-bar/box';
import { ExtendIcon } from './atom/icons/side-bar/extend';
import { HeadphoneIcon } from './atom/icons/side-bar/headphone';
import { LogoutIcon } from './atom/icons/side-bar/logout';
import { PaperIcon } from './atom/icons/side-bar/paper';
import { QuestionIcon } from './atom/icons/side-bar/question';
import { SearchStarIcon } from './atom/icons/side-bar/search-star';
import { SettingIcon } from './atom/icons/side-bar/setting';
import { authUtils } from '@/lib/utils/auth';

type Props = {
  isExpanded: IsExpandedType;
};

export function DashboardSidebar({ isExpanded }: Props) {
  const { queryParams } = useQueryParams();
  const { isExpanded: isExpandedState, toggle } = useSidebarExpand(isExpanded);
  const IS_SIDEBAR_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      href: ROUTES.AI_SEARCH.INDEX,
      icon: SearchStarIcon,
      activePathnames: [ROUTES.AI_SEARCH.INDEX],
      name: 'Overwatch AI',
    },
    {
      href: ROUTES.REPORTS,
      icon: BoxIcon,
      activePathnames: [ROUTES.REPORTS],
      name: 'Archive',
    },
    {
      href: ROUTES.FAQ.INDEX,
      icon: QuestionIcon,
      activePathnames: [ROUTES.FAQ.INDEX],
      name: 'Faq',
    },
    {
      href: ROUTES.SETTINGS.ACCOUNT,
      name: 'Settings',
      icon: SettingIcon,
      activePathnames: [
        ROUTES.SETTINGS.ACCOUNT,
      ],
    },
    { separator: true },
    {
      href: ROUTES.TECH_SUPPORT,
      name: 'Support',
      icon: HeadphoneIcon,
      activePathnames: [ROUTES.TECH_SUPPORT],
    },
    {
      href: ROUTES.BILLING,
      name: 'Billing',
      icon: PaperIcon,
      activePathnames: [ROUTES.BILLING],
    },
    {
      //href: ROUTES.AUTH.LOGIN,
      icon: LogoutIcon,
      name: 'Log Out',
      iconClassName: 'w-5  h-5 relative -left-0.5',
        onClick: () => {
        authUtils.logout();
      },
    },
    {
      href: '',
      icon: ExtendIcon,
      onClick: () => toggle(!IS_SIDEBAR_EXPANDED),
      name: 'Collapse',
      iconClassName: cn('w-5  h-5 relative -left-1.5 duration-300', !IS_SIDEBAR_EXPANDED && '-left-1.5'),
    },
  ];

  return (
    <aside
      style={{
        width: IS_SIDEBAR_EXPANDED ? '76px' : '200px',
      }}
      className={cn(
        'fixed duration-300 transition-[width,background-color] z-30 left-0 top-0 bottom-0 h-screen bg-[#171137] w-[100px] flex flex-col px-3 py-4'
      )}
    >
      <div className="mb-10">
        <Link href={ROUTES.HOME}>
          <Image src="/logo.png" alt="logo" width={100} height={100} quality={100} className="w-[52px] h-[52px] brightness-0 invert" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {menuItems.map((item, index) => {
          if (item.separator) {
            return <span key={index} className="h-px w-full my-2 bg-white/20" />;
          }
          if (!item.icon) return null;
          const Icon = item.icon;

          if (!item.href) {
            const onClick = item.onClick ?? (() => {});
            return (
              <span
                onClick={onClick}
                key={index}
                className="w-[60px] cursor-pointer relative h-[60px] rounded-full flex items-center justify-center text-white/50"
              >
                <Icon className={cn('w-6 h-6 mx-auto', item?.iconClassName)} />
                <span
                  className={cn(
                    'absolute top-4 left-[50px] whitespace-nowrap text-left duration-300',
                    IS_SIDEBAR_EXPANDED ? 'opacity-0 invisible' : 'opacity-100'
                  )}
                >
                  {item?.name}
                </span>
              </span>
            );
          }
          const isActive = item?.activePathnames && (item.activePathnames as string[]).includes(pathname);
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'h-12 flex items-center duration-300 text-white/50 relative',
                isActive && 'bg-[#5C39D9] text-white',
                IS_SIDEBAR_EXPANDED ? 'rounded-full w-12 justify-center' : 'rounded-lg w-[unset] justify-start ps-[18px]'
              )}
            >
              {/* <span className="w-full inline-flex bg-red-400 h-full"></span> */}
              <Icon className={cn('w-5 h-5', item?.iconClassName)} />
              <span
                className={cn(
                  'absolute top-3 left-[50px] whitespace-nowrap text-left duration-300',
                  IS_SIDEBAR_EXPANDED ? 'opacity-0 invisible' : 'opacity-100'
                )}
              >
                {item?.name}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
