import { SVGProps } from "react";

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#A5A5B3"
          d="M8.5 0C3.813 0 0 3.813 0 8.5 0 13.187 3.813 17 8.5 17c4.687 0 8.5-3.813 8.5-8.5C17 3.813 13.187 0 8.5 0Zm3.719 9.208h-3.01v3.01a.708.708 0 0 1-1.417 0v-3.01h-3.01a.708.708 0 0 1 0-1.416h3.01v-3.01a.708.708 0 0 1 1.416 0v3.01h3.01a.708.708 0 0 1 0 1.416Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h17v17H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
