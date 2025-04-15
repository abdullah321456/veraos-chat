import { SVGProps } from 'react';

export type CustomSvgElement = ({ ...props }: SVGProps<SVGSVGElement>) => React.JSX.Element
export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;
