import { SVGProps } from "react";

export function MarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#3181F8"
          d="M12.121 4.086A4.09 4.09 0 0 0 8.035 0 4.09 4.09 0 0 0 3.95 4.086a4.088 4.088 0 0 0 3.814 4.072v7.641a.272.272 0 1 0 .545 0V8.158a4.088 4.088 0 0 0 3.813-4.072Zm-5.448 0a1.09 1.09 0 0 1 0-2.18 1.09 1.09 0 0 1 0 2.18Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16.071v16.071H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
