import { SVGProps } from "react";

export function NotMicroPhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#5C39D9"
          d="M15.426 8.609a.54.54 0 1 0-1.08 0A5.353 5.353 0 0 1 9 13.955 5.353 5.353 0 0 1 3.653 8.61a.54.54 0 1 0-1.079 0 6.434 6.434 0 0 0 5.886 6.403v1.909H6.057a.54.54 0 0 0 0 1.079h5.886a.54.54 0 0 0 0-1.08H9.539v-1.908a6.434 6.434 0 0 0 5.887-6.403Z"
        />
        <path
          fill="#5C39D9"
          d="M9 12.091a3.487 3.487 0 0 0 3.483-3.482V3.483A3.487 3.487 0 0 0 9 0a3.487 3.487 0 0 0-3.482 3.483v5.126A3.487 3.487 0 0 0 9 12.09ZM6.597 3.483A2.406 2.406 0 0 1 9 1.079a2.406 2.406 0 0 1 2.404 2.404v5.126A2.406 2.406 0 0 1 9 11.012 2.406 2.406 0 0 1 6.597 8.61V3.483Z"
        />
        <g filter="url(#b)">
          <path stroke="#5C39D9" d="m17.272 3.42-17 11" />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
        <filter
          id="b"
          width={17.543}
          height={12.84}
          x={0}
          y={3}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2064_928"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2064_928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
