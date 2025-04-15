import { SVGProps } from "react";

export function MoleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      fill="none"
      {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={0.732}
        d="M10.44 15.439a.956.956 0 1 0 0-1.912.956.956 0 0 0 0 1.912Zm1.135-5.216a.956.956 0 1 0 0-1.911.956.956 0 0 0 0 1.911Zm6.451 5.059h-2.312M4.59 20.415v-3.918c0-.407-.179-.79-.485-1.058-1.792-1.564-2.932-3.916-2.932-6.547C1.172 4.184 4.825.366 9.33.366c1.402.004 2.867.18 4.197.586M1.677 24.634l.243-.645a2.85 2.85 0 0 1 2.67-1.848M18.07 8.995a.901.901 0 0 0 .116.76l1.188 1.753a.852.852 0 0 1-.416 1.28l-.477.173a.68.68 0 0 0-.448.64v.192c0 .392.003 2.76-.084 3.129a3.109 3.109 0 0 1-3.116 2.386l-.966-.029h0l-1.296-.038a.89.89 0 0 0-.916.888v2.012h4.505c.945 0 1.829.468 2.36 1.25l.842 1.243"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={0.732}
        d="M5.703 16.531a8.141 8.141 0 0 1-1.6-1.092m4.434-6.736h-.693a1.06 1.06 0 0 0-1.059 1.06v1.701c0 .585.474 1.06 1.06 1.06h.692"
      />
    </svg>
  );
}
