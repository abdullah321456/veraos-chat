import { SVGProps } from "react";

export function RedStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#FB433C"
          d="M0 4.4A4.4 4.4 0 0 1 4.4 0H11v22H4.4A4.4 4.4 0 0 1 0 17.6V4.4Zm22 0A4.4 4.4 0 0 0 17.6 0H11v22h6.6a4.4 4.4 0 0 0 4.4-4.4V4.4Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m11 14.71 2.855 1.472a.825.825 0 0 0 1.192-.866l-.517-3.17 2.281-2.26a.824.824 0 0 0-.455-1.4l-3.174-.488-1.445-2.868a.825.825 0 0 0-1.473 0L8.819 7.998l-3.174.487a.825.825 0 0 0-.455 1.402l2.281 2.26-.517 3.169a.825.825 0 0 0 1.192.866L11 14.711Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
