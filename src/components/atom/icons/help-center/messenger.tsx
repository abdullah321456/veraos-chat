import { SVGProps } from "react";

export function MessengerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
      {...props}>
      <path
        fill="#5C39D9"
        d="M3.667 11.23a3.208 3.208 0 1 1 6.417 0 3.208 3.208 0 0 1-6.417 0Zm-.803 5.592a6.211 6.211 0 0 1 4.011-1.468c1.565 0 2.981.59 4.011 1.468 1.021.87 1.718 2.079 1.718 3.345 0 .38-.307.687-.687.687H1.834a.687.687 0 0 1-.688-.687c0-1.266.697-2.475 1.718-3.345Z"
      />
      <path
        fill="#5C39D9"
        fillRule="evenodd"
        d="M15.584 1.146a5.27 5.27 0 0 0-3.544 9.172c-.093.445-.267.77-.61 1.113a.687.687 0 0 0 .487 1.173c.25 0 .5-.063.72-.135.225-.075.463-.177.697-.284.234-.109.978-.48 1.216-.599a5.27 5.27 0 1 0 1.033-10.44Zm-.688 4.583h-1.382v1.375h1.382V5.73Zm2.75 0h-1.382v1.375h1.382V5.73Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
