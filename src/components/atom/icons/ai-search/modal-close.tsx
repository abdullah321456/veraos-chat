import { SVGProps } from "react";

export function ModalCloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
      style={{ color: props.style?.color || '#616166', ...props.style }}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6.758 17.243 12.001 12l5.243 5.243m0-10.486L12 12 6.758 6.757"
      />
    </svg>
  );
}
