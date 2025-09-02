import { SVGProps } from 'react';

export type CustomSvgElement = ({ ...props }: SVGProps<SVGSVGElement>) => React.JSX.Element
export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;
export const normalizeMergeResponse = (val: any) => {
    if (Array.isArray(val)) return val;   // already array → spread later
    if (val && typeof val === "object") return [val]; // wrap object in array
    return []; // null/undefined → empty
};