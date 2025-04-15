import { SVGProps } from "react";

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#8E8E8E"
        d="M17.192 11.198a.554.554 0 0 0-.577-.13 7.436 7.436 0 0 1-9.501-9.502.554.554 0 0 0-.707-.708 8.428 8.428 0 0 0-3.173 2.007 8.543 8.543 0 1 0 14.09 8.91.555.555 0 0 0-.132-.577Zm-2.659 2.966A7.436 7.436 0 1 1 5.748 2.358a8.594 8.594 0 0 0 2.327 7.747 8.593 8.593 0 0 0 7.747 2.327 7.401 7.401 0 0 1-1.289 1.732Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.182.273h17.727V18H.182z" />
      </clipPath>
    </defs>
  </svg>
  );
}
