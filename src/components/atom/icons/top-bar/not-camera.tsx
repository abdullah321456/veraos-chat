import { SVGProps } from "react";

export function NotCameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}>
      <g
        stroke="#5C39D9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        clipPath="url(#a)">
        <path d="m1.5 1.5 15 15M5.25 5.25H3a1.5 1.5 0 0 0-1.5 1.5v6.75A1.5 1.5 0 0 0 3 15h12M7.125 3h3.75l1.875 2.25H15a1.5 1.5 0 0 1 1.5 1.5v5.625" />
        <path d="M10.592 11.34A2.25 2.25 0 1 1 7.41 8.16" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
