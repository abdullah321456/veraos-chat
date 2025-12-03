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
import { HeadphoneIcon } from './atom/icons/side-bar/headphone';
import { LogoutIcon } from './atom/icons/side-bar/logout';
import { PaperIcon } from './atom/icons/side-bar/paper';
import { QuestionIcon } from './atom/icons/side-bar/question';
import { SettingIcon } from './atom/icons/side-bar/setting';
import { authUtils } from '@/lib/utils/auth';
import { useEffect, useCallback, Suspense } from 'react';

type Props = {
  isExpanded: IsExpandedType;
};

function DashboardSidebarContent({ isExpanded }: Props) {
  const { queryParams } = useQueryParams();
  const { isExpanded: isExpandedState, toggle } = useSidebarExpand(isExpanded);
  const IS_SIDEBAR_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);

  const pathname = usePathname();
  const router = useRouter();

  // Route preloading for performance optimization
  const preloadRoute = useCallback((href: string) => {
    if (typeof window !== 'undefined') {
      // Preload the route components
      if (href === ROUTES.AI_SEARCH.INDEX) {
        import('@/app/(dashboard-layout)/(ai-search-layout)/ai-search/page');
        import('@/app/(dashboard-layout)/(ai-search-layout)/ai-search/_view/conversation');
      } else if (href === ROUTES.REPORTS) {
        import('@/app/(dashboard-layout)/reports/_view/reports-table');
      }
    }
  }, []);

  // Preload critical routes on component mount
  useEffect(() => {
    preloadRoute(ROUTES.AI_SEARCH.INDEX);
    preloadRoute(ROUTES.REPORTS);
  }, [preloadRoute]);

  const menuItems = [
    {
      href: ROUTES.AI_SEARCH.INDEX,
      icon: null, // Using image instead
      imageSrc: '/ai-search-tab.svg',
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
      activePathnames: [ROUTES.FAQ.INDEX, ROUTES.FAQ.HELP_CENTER, ROUTES.FAQ.TERMS_OF_USE],
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
      href: ROUTES.BILLING,
      name: 'Billing',
      icon: PaperIcon,
      activePathnames: [ROUTES.BILLING],
    },
    { separator: true },
    {
      href: '',
      icon: null, // Using image instead
      imageSrc: '/menu-collapse.svg',
      onClick: () => toggle(!IS_SIDEBAR_EXPANDED),
      name: 'Collapse',
    },
    { separator: true },
    {
      //href: ROUTES.AUTH.LOGIN,
      icon: LogoutIcon,
      name: 'Log Out',
      onClick: () => {
        authUtils.logout();
      },
    },
  ];

  return (
      <aside
          style={{
            width: IS_SIDEBAR_EXPANDED ? '76px' : '200px',
          }}
          className={cn(
              'fixed duration-300 transition-[width,background-color] z-30 left-0 top-0 bottom-0 h-screen bg-[#0F141E] w-[100px] flex flex-col px-2 sm:px-3 py-3 sm:py-4',
              // Hide on small screens by default
              'hidden sm:flex'
          )}
      >
        <div className="mb-6 sm:mb-10">
          <Link href={ROUTES.HOME} className={cn('flex-shrink-0 flex items-center', IS_SIDEBAR_EXPANDED ? 'justify-center' : 'justify-start')}>
            <Image 
              src={IS_SIDEBAR_EXPANDED ? "/logo.png" : "/logo-with-label.png"} 
              alt="Overwatch AI" 
              width={IS_SIDEBAR_EXPANDED ? 100 : 200} 
              height={IS_SIDEBAR_EXPANDED ? 100 : 100} 
              quality={100} 
              className={cn(
                'brightness-0 invert object-contain',
                IS_SIDEBAR_EXPANDED 
                  ? 'w-[32px] sm:w-[40px] h-[32px] sm:h-[40px]' 
                  : 'h-[32px] sm:h-[40px] w-auto max-w-[140px] sm:max-w-[160px]'
              )} 
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full flex-1">
          {menuItems.map((item, index) => {
            
            if (item.separator) {
              return <span key={index} className="h-px w-full my-2 bg-white/20" />;
            }
            if (!item.icon && !item.imageSrc) return null;
            const Icon = item.icon;

            if (!item.href) {
              const onClick = item.onClick ?? (() => {});
              const isCollapse = item.name === 'Collapse';
              const isLogout = item.name === 'Log Out';
              // Render collapse and logout similar to billing (as a Link-like component)
              if (isCollapse || isLogout) {
                return (
                  <span
                    onClick={onClick}
                    key={index}
                    className={cn(
                      'h-12 flex items-center duration-300 text-white/50 relative cursor-pointer',
                      IS_SIDEBAR_EXPANDED ? 'rounded-full w-12 justify-center' : 'rounded-lg w-[unset] justify-start ps-[18px]'
                    )}
                  >
                    {Icon ? (
                      <Icon className={cn('w-5 h-5', item?.iconClassName)} />
                    ) : item.imageSrc ? (
                      <Image 
                        src={item.imageSrc} 
                        alt={item.name || ''} 
                        width={20} 
                        height={20} 
                        className={cn('w-5 h-5 object-contain', item?.iconClassName)} 
                      />
                    ) : null}
                    <span
                      className={cn(
                        'absolute top-3 left-[50px] whitespace-nowrap text-left duration-300',
                        IS_SIDEBAR_EXPANDED ? 'opacity-0 invisible' : 'opacity-100'
                      )}
                    >
                      {item?.name}
                    </span>
                  </span>
                );
              }
              // For other items without href
              return (
                  <span
                      onClick={onClick}
                      key={index}
                      className="w-[60px] cursor-pointer relative h-[60px] rounded-full flex items-center justify-center text-white/50"
                  >
                {Icon ? (
                  <Icon className={cn('w-6 h-6 mx-auto', item?.iconClassName)} />
                ) : item.imageSrc ? (
                  <Image 
                    src={item.imageSrc} 
                    alt={item.name || ''} 
                    width={24} 
                    height={24} 
                    className={cn('w-6 h-6 mx-auto object-contain', item?.iconClassName)} 
                  />
                ) : null}
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
                    onMouseEnter={() => preloadRoute(item.href)}
                    onClick={(e) => {
                      // Ensure clean navigation by preventing any query parameter conflicts
                      if (item.href === ROUTES.AI_SEARCH.INDEX) {
                        // Clear any conflicting query parameters when navigating to AI Search
                        const url = new URL(item.href, window.location.origin);
                        e.currentTarget.href = url.toString();
                      }
                    }}
                    className={cn(
                        'h-12 flex items-center duration-300 text-white/50 relative',
                        isActive && 'bg-[#343A46] text-white',
                        IS_SIDEBAR_EXPANDED ? 'rounded-full w-12 justify-center' : 'rounded-lg w-[unset] justify-start ps-[18px]'
                    )}
                    style={isActive ? { boxShadow: '0px 3px 10px 0px #1C0E350A' } : undefined}
                >
                  {/* <span className="w-full inline-flex bg-red-400 h-full"></span> */}
                  {Icon ? (
                    <Icon className={cn('w-5 h-5', item?.iconClassName)} />
                  ) : item.imageSrc ? (
                    <Image 
                      src={item.imageSrc} 
                      alt={item.name || ''} 
                      width={20} 
                      height={20} 
                      className={cn('w-5 h-5 object-contain', item?.iconClassName)} 
                    />
                  ) : null}
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

export function DashboardSidebar({ isExpanded }: Props) {
  return (
    <Suspense fallback={
      <aside
        style={{ width: '76px' }}
        className={cn(
          'fixed duration-300 transition-[width,background-color] z-30 left-0 top-0 bottom-0 h-screen bg-[#0F141E] w-[100px] flex flex-col px-2 sm:px-3 py-3 sm:py-4',
          'hidden sm:flex'
        )}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </aside>
    }>
      <DashboardSidebarContent isExpanded={isExpanded} />
    </Suspense>
  );
}
