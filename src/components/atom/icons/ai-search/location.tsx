import { SVGProps } from "react";

export function LocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={15}
      fill="none"
      {...props}>
      <path
        fill="#616166"
        fillRule="evenodd"
        d="M6.679 5.02a1.24 1.24 0 1 0 .001 2.478 1.24 1.24 0 0 0-.001-2.477m0 3.542A2.304 2.304 0 0 1 4.377 6.26a2.305 2.305 0 0 1 2.302-2.303A2.305 2.305 0 0 1 8.981 6.26 2.304 2.304 0 0 1 6.68 8.563"
        clipRule="evenodd"
      />
      <mask
        id="a"
        width={13}
        height={15}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M.834.417h11.687v13.812H.834V.417Z"
          clipRule="evenodd"
        />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#616166"
          fillRule="evenodd"
          d="M6.678 1.48c-2.637 0-4.782 2.165-4.782 4.825 0 3.385 3.984 6.683 4.782 6.859.797-.176 4.781-3.475 4.781-6.859 0-2.66-2.145-4.826-4.781-4.826Zm0 12.75c-1.271 0-5.844-3.934-5.844-7.925C.834 3.058 3.456.417 6.678.417c3.222 0 5.843 2.641 5.843 5.888 0 3.992-4.573 7.924-5.843 7.924Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}
