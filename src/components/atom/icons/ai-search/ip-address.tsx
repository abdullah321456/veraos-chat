import { SVGProps } from "react";

export function IpAddressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 1.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V6a.5.5 0 0 1-1 0V4.5H6a.5.5 0 0 1 0-1h1.5V2a.5.5 0 0 1 .5-.5ZM4.5 8a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5V8ZM3 8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M6 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM6 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
      />
    </svg>
  );
} 