'use client';
import { SVGProps, useState, useEffect } from 'react';
import cn from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import { MAP_PAGE_HEADER_TITLE } from '@/config/routes';
import { ROUTES } from '@/config/routes';
import { IsExpandedType, useSidebarExpand, getIsSidebarExpandedOnClient } from '@/lib/hooks/use-sidebar-expand';
import Link from 'next/link';
import Image from 'next/image';
import { BoxIcon } from './atom/icons/side-bar/box';
import { HeadphoneIcon } from './atom/icons/side-bar/headphone';
import { LogoutIcon } from './atom/icons/side-bar/logout';
import { PaperIcon } from './atom/icons/side-bar/paper';
import { QuestionIcon } from './atom/icons/side-bar/question';
import { SettingIcon } from './atom/icons/side-bar/setting';
import { authUtils } from '@/lib/utils/auth';

type Props = {
  isExpanded?: IsExpandedType;
};

export function DashboardHeader({ isExpanded }: Props = {}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const { isExpanded: isExpandedState } = useSidebarExpand(isExpanded);
  const IS_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsSmallDevice(window.innerWidth < 640);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Get the current page title from the mapping
  const getCurrentPageTitle = () => {
    // Check for exact matches in the mapping
    if (MAP_PAGE_HEADER_TITLE[pathname as keyof typeof MAP_PAGE_HEADER_TITLE]) {
      return MAP_PAGE_HEADER_TITLE[pathname as keyof typeof MAP_PAGE_HEADER_TITLE];
    }
    
    // Default fallback
    return 'Overwatch AI';
  };

  const currentPageTitle = getCurrentPageTitle();

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-20 h-16 flex justify-between items-center px-4 sm:px-6 border-gray-200 bg-white sm:bg-white"
      style={{ backgroundColor: isSmallDevice ? '#0F141E' : 'transparent' }}
    >
      <div className="flex items-center gap-3">
        {/* Logo - only show on small devices */}
        <div className="block sm:hidden">
          <Link href={ROUTES.HOME}>
            <Image
              src="/logo-with-label.png"
              alt="Overwatch AI"
              width={120}
              height={40}
              quality={100}
              className="h-6 w-auto object-contain"
            />
          </Link>
        </div>
        {/* Page title - show on large devices */}
        <h1 className={cn(
          "hidden sm:block text-base sm:text-lg md:text-xl font-bold text-gray-900 ml-0 truncate pr-2",
          IS_EXPANDED ? "sm:ml-[80px]" : "sm:ml-[200px]"
        )}>{currentPageTitle}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Mobile Menu Toggle - only show on small screens */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="block sm:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[60] sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 bottom-0 w-[200px] bg-[#0F141E] z-[70] sm:hidden">
              <MobileDashboardMenu onClose={() => setIsMobileMenuOpen(false)} />
            </div>
          </>
        )}
        <div className="hidden sm:block">
          <AdvanceSwitch
            positiveIconSrc="/light-mode.svg"
            negativeIconSrc="/dark-mode.svg"
          />
        </div>
        {/*<AdvanceSwitch*/}
        {/*  positiveIcon={<CameraActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*  negativeIcon={<CameraInActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*/>*/}
        {/*<AdvanceSwitch*/}
        {/*  positiveIcon={<MicActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*  negativeIcon={<MicInActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*/>*/}
        {/*<AdvanceSwitch*/}
        {/*  positiveIcon={<SoundActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*  negativeIcon={<SoundInActiveIcon className="w-[18px] h-[18px]" />}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

function MobileDashboardMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: ROUTES.AI_SEARCH.INDEX,
      icon: null, // Using image instead
      imageSrc: '/updated-ai-search-tab.png',
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
      activePathnames: [ROUTES.SETTINGS.ACCOUNT],
    },
    { separator: true },
    {
      href: ROUTES.BILLING,
      name: 'Billing',
      icon: PaperIcon,
      activePathnames: [ROUTES.BILLING],
    },
    {
      icon: LogoutIcon,
      name: 'Log Out',
      iconClassName: 'w-5 h-5 relative -left-0.5',
      onClick: () => {
        authUtils.logout();
      },
    },
  ];

  return (
    <div className="flex flex-col h-full px-3 py-4">
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between mb-6 sm:mb-10">
        <Link href={ROUTES.HOME} onClick={onClose}>
          <Image
            src="/logo-with-label.png"
            alt="Overwatch AI"
            width={200}
            height={100}
            quality={100}
            className="brightness-0 invert object-contain h-[32px] sm:h-[40px] w-auto max-w-[140px] sm:max-w-[160px]"
          />
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 w-full">
        {menuItems.map((item, index) => {
          if (item.separator) {
            return <span key={index} className="h-px w-full my-2 bg-white/20" />;
          }
          if (!item.icon && !item.imageSrc) return null;
          const Icon = item.icon;

          if (!item.href) {
            const onClick = item.onClick ?? (() => {});
            return (
              <button
                onClick={() => {
                  onClick();
                  onClose();
                }}
                key={index}
                className="h-12 flex items-center rounded-lg w-full justify-start ps-[18px] text-white/50 hover:bg-white/10 transition-colors"
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
                <span className="ml-4 whitespace-nowrap text-left">{item?.name}</span>
              </button>
            );
          }

          const isActive = item?.activePathnames && (item.activePathnames as string[]).includes(pathname);
          return (
            <Link
              key={index}
              href={item.href}
              onClick={onClose}
              className={cn(
                'h-12 flex items-center rounded-lg w-full justify-start ps-[18px] text-white/50 transition-colors',
                isActive && 'bg-[#5C39D9] text-white'
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
              <span className="ml-4 whitespace-nowrap text-left">{item?.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function AdvanceSwitch({ positiveIconSrc, negativeIconSrc }: { positiveIconSrc: string; negativeIconSrc: string }) {
  const [isChecked, setIsChecked] = useState(true);
  const activeClassName = 'text-primary bg-white shadow-lg';
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
      className="inline-flex gap-1 select-none cursor-pointer items-center justify-center h-7 bg-white rounded-full p-0.5"
    >
      <span
        className={cn(
          'text-gray-600 duration-300 rounded-full aspect-square p-1 flex items-center justify-center',
          isChecked && activeClassName
        )}
      >
        <Image 
          src={positiveIconSrc} 
          alt="Light mode" 
          width={18} 
          height={18} 
          className="w-[18px] h-[18px] object-contain" 
        />
      </span>
      <span
        className={cn(
          'text-gray-600 duration-300 rounded-full aspect-square p-1 flex items-center justify-center',
          !isChecked && activeClassName
        )}
      >
        <Image 
          src={negativeIconSrc} 
          alt="Dark mode" 
          width={18} 
          height={18} 
          className="w-[18px] h-[18px] object-contain" 
        />
      </span>
    </div>
  );
}


const CameraActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10.875 3h-3.75L5.25 5.25H3a1.5 1.5 0 0 0-1.5 1.5v6.75A1.5 1.5 0 0 0 3 15h12a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-2.25L10.875 3Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9 12a2.25 2.25 0 1 0 0-4.5A2.25 2.25 0 0 0 9 12Z"
    />
  </svg>
);
const CameraInActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} clipPath="url(#aCameraInActiveIcon)">
      <path d="m1.5 1.5 15 15M5.25 5.25H3a1.5 1.5 0 0 0-1.5 1.5v6.75A1.5 1.5 0 0 0 3 15h12M7.125 3h3.75l1.875 2.25H15a1.5 1.5 0 0 1 1.5 1.5v5.625" />
      <path d="M10.59 11.34a2.251 2.251 0 1 1-3.18-3.18" />
    </g>
    <defs>
      <clipPath id="aCameraInActiveIcon">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);

const MicActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <g fill="currentColor" clipPath="url(#aMicActiveIcon)">
      <path d="M15.426 8.609a.54.54 0 1 0-1.08 0A5.353 5.353 0 0 1 9 13.955 5.353 5.353 0 0 1 3.653 8.61a.54.54 0 1 0-1.079 0 6.434 6.434 0 0 0 5.886 6.403v1.909H6.057a.54.54 0 0 0 0 1.079h5.886a.54.54 0 0 0 0-1.08H9.539v-1.908a6.434 6.434 0 0 0 5.887-6.403Z" />
      <path d="M9 12.091a3.487 3.487 0 0 0 3.483-3.482V3.483A3.487 3.487 0 0 0 9 0a3.487 3.487 0 0 0-3.482 3.483v5.126A3.487 3.487 0 0 0 9 12.09ZM6.597 3.483A2.406 2.406 0 0 1 9 1.079a2.406 2.406 0 0 1 2.404 2.404v5.126A2.406 2.406 0 0 1 9 11.012 2.406 2.406 0 0 1 6.597 8.61V3.483Z" />
    </g>
    <defs>
      <clipPath id="aMicActiveIcon">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);

const MicInActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <g clipPath="url(#aMicInActiveIcon)">
      <path
        fill="currentColor"
        d="M15.426 8.609a.54.54 0 1 0-1.08 0A5.353 5.353 0 0 1 9 13.955 5.353 5.353 0 0 1 3.653 8.61a.54.54 0 1 0-1.079 0 6.434 6.434 0 0 0 5.886 6.403v1.909H6.057a.54.54 0 0 0 0 1.079h5.886a.54.54 0 0 0 0-1.08H9.539v-1.908a6.434 6.434 0 0 0 5.887-6.403Z"
      />
      <path
        fill="currentColor"
        d="M9 12.091a3.487 3.487 0 0 0 3.483-3.482V3.483A3.487 3.487 0 0 0 9 0a3.487 3.487 0 0 0-3.482 3.483v5.126A3.487 3.487 0 0 0 9 12.09ZM6.597 3.483A2.406 2.406 0 0 1 9 1.079a2.406 2.406 0 0 1 2.404 2.404v5.126A2.406 2.406 0 0 1 9 11.012 2.406 2.406 0 0 1 6.597 8.61V3.483Z"
      />
      <g filter="url(#bMicInActiveIcon)">
        <path stroke="currentColor" d="m17.272 3.42-17 11" />
      </g>
    </g>
    <defs>
      <clipPath id="aMicInActiveIcon">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
      <filter id="bMicInActiveIcon" width={17.544} height={12.84} x={0} y={3} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_67_3948" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_67_3948" result="shape" />
      </filter>
    </defs>
  </svg>
);
const SoundActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M9 1.125a.563.563 0 0 0-.563.563v14.624a.562.562 0 1 0 1.126 0V1.688A.563.563 0 0 0 9 1.125Zm2.25 3.938a.562.562 0 0 0-.563.562v7.313a.562.562 0 1 0 1.126 0V5.625a.563.563 0 0 0-.563-.563Zm2.25-1.688a.562.562 0 0 0-.563.563v10.687a.562.562 0 1 0 1.126 0V3.937a.563.563 0 0 0-.563-.562Zm2.25 3.375a.562.562 0 0 0-.563.563v3.937a.562.562 0 1 0 1.126 0V7.312a.563.563 0 0 0-.563-.562Zm-9-1.688a.563.563 0 0 0-.563.563v7.313a.562.562 0 1 0 1.125 0V5.625a.563.563 0 0 0-.562-.563ZM4.5 3.375a.563.563 0 0 0-.563.563v10.687a.562.562 0 1 0 1.126 0V3.937a.563.563 0 0 0-.563-.562ZM2.25 6.75a.563.563 0 0 0-.563.563v3.937a.562.562 0 1 0 1.125 0V7.312a.563.563 0 0 0-.562-.562Z"
    />
  </svg>
);
const SoundInActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <g clipPath="url(#aSoundInActiveIcon)">
      <path
        fill="currentColor"
        d="M9 1.125a.563.563 0 0 0-.563.563v14.624a.562.562 0 1 0 1.126 0V1.688A.563.563 0 0 0 9 1.125Zm2.25 3.938a.562.562 0 0 0-.563.562v7.313a.562.562 0 1 0 1.126 0V5.625a.563.563 0 0 0-.563-.563Zm2.25-1.688a.562.562 0 0 0-.563.563v10.687a.562.562 0 1 0 1.126 0V3.937a.563.563 0 0 0-.563-.562Zm2.25 3.375a.562.562 0 0 0-.563.563v3.937a.562.562 0 1 0 1.126 0V7.312a.563.563 0 0 0-.563-.562Zm-9-1.688a.563.563 0 0 0-.563.563v7.313a.562.562 0 1 0 1.125 0V5.625a.563.563 0 0 0-.562-.563ZM4.5 3.375a.563.563 0 0 0-.563.563v10.687a.562.562 0 1 0 1.126 0V3.937a.563.563 0 0 0-.563-.562ZM2.25 6.75a.563.563 0 0 0-.563.563v3.937a.562.562 0 1 0 1.125 0V7.312a.563.563 0 0 0-.562-.562Z"
      />
      <g filter="url(#bSoundInActiveIcon)">
        <path stroke="currentColor" d="m18.272 3.42-17 11" />
      </g>
    </g>
    <defs>
      <clipPath id="aSoundInActiveIcon">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
      <filter
        id="bSoundInActiveIcon"
        width={17.544}
        height={12.84}
        x={1}
        y={3}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_67_3936" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_67_3936" result="shape" />
      </filter>
    </defs>
  </svg>
);
