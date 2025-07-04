'use client';
import { ReactNode, SVGProps, useState } from 'react';
import cn from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import { MAP_PAGE_HEADER_TITLE } from '@/config/routes';

export function DashboardHeader() {
  const pathname = usePathname();
  
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
    <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 h-16 flex justify-start items-center px-6">
      <h1 className="text-xl font-bold text-gray-900 ml-[200px]">{currentPageTitle}</h1>
      <div className="flex items-center gap-4">
        {/* Temporarily hidden - buttons don't work currently
        <AdvanceSwitch
          positiveIcon={<LightModeIcon className="w-[18px] h-[18px]" />}
          negativeIcon={<DarkModeIcon className="w-[18px] h-[18px]" />}
        />
        <AdvanceSwitch
          positiveIcon={<CameraActiveIcon className="w-[18px] h-[18px]" />}
          negativeIcon={<CameraInActiveIcon className="w-[18px] h-[18px]" />}
        />
        <AdvanceSwitch
          positiveIcon={<MicActiveIcon className="w-[18px] h-[18px]" />}
          negativeIcon={<MicInActiveIcon className="w-[18px] h-[18px]" />}
        />
        <AdvanceSwitch
          positiveIcon={<SoundActiveIcon className="w-[18px] h-[18px]" />}
          negativeIcon={<SoundInActiveIcon className="w-[18px] h-[18px]" />}
        />
        */}
      </div>
    </div>
  );
}

function AdvanceSwitch({ positiveIcon, negativeIcon }: { positiveIcon: ReactNode; negativeIcon: ReactNode }) {
  const [isChecked, setIsChecked] = useState(true);
  const activeClassName = 'text-primary bg-white shadow-lg';
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
      className="inline-flex gap-1 select-none cursor-pointer items-center justify-center h-9 bg-gray-200/70 rounded-full p-1"
    >
      <span
        className={cn(
          'text-gray-600 duration-300 rounded-full aspect-square p-1 flex items-center justify-center',
          isChecked && activeClassName
        )}
      >
        {positiveIcon}
      </span>
      <span
        className={cn(
          'text-gray-600 duration-300 rounded-full aspect-square p-1 flex items-center justify-center',
          !isChecked && activeClassName
        )}
      >
        {negativeIcon}
      </span>
    </div>
  );
}

const LightModeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none" {...props}>
    <g clipPath="url(#aLightModeIcon)">
      <path
        fill="currentColor"
        d="M12.46 5.994a4.47 4.47 0 0 0-3.14-1.313 4.37 4.37 0 0 0-3.142 1.313 4.47 4.47 0 0 0-1.314 3.142 4.47 4.47 0 0 0 1.314 3.143 4.47 4.47 0 0 0 3.142 1.313 4.373 4.373 0 0 0 3.142-1.314 4.47 4.47 0 0 0 1.313-3.142 4.372 4.372 0 0 0-1.313-3.142Zm-.843 5.44a3.244 3.244 0 0 1-2.298.938 3.244 3.244 0 0 1-2.298-.938 3.243 3.243 0 0 1-.938-2.298c0-.89.352-1.711.938-2.298A3.243 3.243 0 0 1 9.319 5.9c.89 0 1.711.352 2.298.938.586.587.938 1.407.938 2.298s-.352 1.712-.938 2.298Zm5.956-2.907h-1.806a.62.62 0 0 0-.61.61.62.62 0 0 0 .61.609h1.806a.62.62 0 0 0 .61-.61.62.62 0 0 0-.61-.61Zm-8.254 6.448a.62.62 0 0 0-.61.61v1.805c0 .329.281.61.61.61a.62.62 0 0 0 .61-.61v-1.805a.62.62 0 0 0-.61-.61Zm6.26-.422-1.29-1.29c-.21-.234-.609-.234-.843 0a.594.594 0 0 0 0 .845l1.29 1.29a.594.594 0 0 0 .843 0 .594.594 0 0 0 0-.845ZM9.32.273a.62.62 0 0 0-.61.61v1.805c0 .328.281.61.61.61a.62.62 0 0 0 .61-.61V.882a.62.62 0 0 0-.61-.61Zm6.284 2.603a.594.594 0 0 0-.844 0l-1.29 1.29a.595.595 0 0 0 0 .843c.211.235.61.235.844 0l1.29-1.29a.594.594 0 0 0 0-.843ZM2.87 8.526H1.065a.62.62 0 0 0-.61.61c0 .329.258.61.61.61H2.87a.62.62 0 0 0 .61-.61.62.62 0 0 0-.61-.61Zm2.298 4.737c-.21-.234-.61-.234-.844 0l-1.29 1.29a.594.594 0 0 0 0 .844c.235.235.61.235.845 0l1.29-1.29a.594.594 0 0 0 0-.844Zm0-9.098-1.29-1.29a.594.594 0 0 0-.844 0 .594.594 0 0 0 0 .845l1.29 1.29c.235.234.61.234.844 0a.594.594 0 0 0 0-.845Z"
      />
    </g>
    <defs>
      <clipPath id="aLightModeIcon">
        <path fill="#fff" d="M.455.273h17.727V18H.455z" />
      </clipPath>
    </defs>
  </svg>
);

const DarkModeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" {...props}>
    <g clipPath="url(#aDarkModeIcon)">
      <path
        fill="currentColor"
        d="M17.192 11.198a.554.554 0 0 0-.577-.13 7.436 7.436 0 0 1-9.501-9.502.554.554 0 0 0-.707-.708 8.428 8.428 0 0 0-3.173 2.007 8.543 8.543 0 1 0 14.09 8.91.555.555 0 0 0-.132-.577Zm-2.659 2.966A7.436 7.436 0 1 1 5.748 2.358a8.594 8.594 0 0 0 2.327 7.747 8.593 8.593 0 0 0 7.747 2.327 7.401 7.401 0 0 1-1.289 1.732Z"
      />
    </g>
    <defs>
      <clipPath id="aDarkModeIcon">
        <path fill="#fff" d="M.182.273h17.727V18H.182z" />
      </clipPath>
    </defs>
  </svg>
);

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
