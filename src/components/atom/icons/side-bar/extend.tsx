import { SVGProps } from 'react';

export function ExtendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}        
        strokeWidth={2}
        clipPath="url(#a_ExtendIcon)"
      >
        <path d="M13.875 15.428v5.76c0 1.035-.84 1.875-1.875 1.875H2.812a1.875 1.875 0 0 1-1.874-1.875V12c0-1.036.839-1.875 1.875-1.875h5.76M6.374.937H3.75A2.813 2.813 0 0 0 .937 3.75v2.625M10.126.937h3.75m3.75 0h2.625a2.813 2.813 0 0 1 2.813 2.813v2.625m0 11.25v2.625a2.813 2.813 0 0 1-2.813 2.813h-2.625m5.438-12.938v3.75m-16.139 3.2 11.84-11.838" />
        <path d="M6.375 14.813v2.812h2.813M16.5 4.687h2.813V7.5" />
      </g>
      <defs>
        <clipPath id="a_ExtendIcon">
          <path fill="currentColor" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
