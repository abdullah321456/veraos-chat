import { SVGProps } from "react";

export function BlueLocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <path
        fill="#3181F8"
        d="M5.832 6.667a2.167 2.167 0 1 1 4.333 0 2.167 2.167 0 0 1-4.333 0Z"
      />
      <path
        fill="#3181F8"
        fillRule="evenodd"
        d="M2.516 5.918A5.36 5.36 0 0 1 7.856 1h.288a5.36 5.36 0 0 1 5.34 4.918 5.8 5.8 0 0 1-1.29 4.145L9 13.97a1.291 1.291 0 0 1-2 0l-3.195-3.908a5.8 5.8 0 0 1-1.29-4.145ZM8 3.5a3.167 3.167 0 1 0 0 6.333A3.167 3.167 0 0 0 8 3.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
