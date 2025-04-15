import { SVGProps } from "react";

export function ExpandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#616166"
        d="M5.25 1.313V0H.656A.656.656 0 0 0 0 .656V5.25h1.313V2.238l6.096 6.096.925-.925-6.096-6.096H5.25ZM20.344 0H15.75v1.313h3.012l-6.096 6.096.925.925 6.097-6.096V5.25H21V.656A.656.656 0 0 0 20.344 0Zm-.657 18.762-6.096-6.096-.925.925 6.096 6.097H15.75V21h4.594a.656.656 0 0 0 .656-.656V15.75h-1.313v3.012ZM7.41 12.66l-6.096 6.103V15.75H0v4.594c0 .362.294.656.656.656H5.25v-1.313H2.238l6.096-6.096-.925-.932Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h21v21H0z" />
      </clipPath>
    </defs>
  </svg>
  );
}
