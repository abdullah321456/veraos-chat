import { SVGProps } from "react";

export function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      stroke="#616166"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10.875 3h-3.75L5.25 5.25H3a1.5 1.5 0 0 0-1.5 1.5v6.75A1.5 1.5 0 0 0 3 15h12a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-2.25L10.875 3Z"
    />
    <path
      stroke="#616166"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9 12a2.25 2.25 0 1 0 0-4.5A2.25 2.25 0 0 0 9 12Z"
    />
  </svg>
  );
}
