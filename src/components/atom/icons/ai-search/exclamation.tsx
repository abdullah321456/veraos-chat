import { SVGProps } from "react";

export function ExclamationIcon(props: SVGProps<SVGSVGElement>) {
  const { width, height, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      {...restProps}>
      <g clipPath="url(#a)">
        <path
          fill="#616166"
          d="M12 0C5.368 0 0 5.367 0 12c0 6.632 5.367 12 12 12 6.632 0 12-5.367 12-12 0-6.632-5.367-12-12-12Zm1.232 16.764c0 .379-.552.758-1.232.758-.71 0-1.216-.38-1.216-.758v-6.019c0-.442.505-.742 1.216-.742.68 0 1.232.3 1.232.742v6.019ZM12 8.55c-.726 0-1.295-.537-1.295-1.138 0-.6.569-1.121 1.295-1.121.711 0 1.28.521 1.28 1.121S12.71 8.55 12 8.55Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
