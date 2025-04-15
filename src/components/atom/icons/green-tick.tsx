import { SVGProps } from "react";

export function GreenTickIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#00BA00"
          fillRule="evenodd"
          d="M8.002 1.004A7 7 0 1 1 8 15.006a7 7 0 0 1 .002-14.002Zm-1.454 9.274L4.835 8.562a.752.752 0 0 1 0-1.06.753.753 0 0 1 1.06 0L7.103 8.71l3.006-3.006a.751.751 0 0 1 1.06 0 .752.752 0 0 1 0 1.06l-3.536 3.538a.752.752 0 0 1-1.085-.025Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
