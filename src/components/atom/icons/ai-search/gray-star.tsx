import { SVGProps } from "react";

export function GrayStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <path
        fill="#616166"
        d="M11.231 14.75H4.769a3.524 3.524 0 0 1-3.519-3.52V4.77a3.523 3.523 0 0 1 3.519-3.52h6.462a3.523 3.523 0 0 1 3.519 3.52v6.46a3.523 3.523 0 0 1-3.519 3.52Zm-6.462-12A2.022 2.022 0 0 0 2.75 4.77v6.46a2.022 2.022 0 0 0 2.019 2.02h6.462a2.022 2.022 0 0 0 2.019-2.02V4.77a2.022 2.022 0 0 0-2.019-2.02H4.769Z"
      />
      <path
        fill="#616166"
        d="M11.226 7.229a.5.5 0 0 0-.404-.341l-1.64-.239-.734-1.486a.522.522 0 0 0-.896 0L6.818 6.65l-1.64.239a.5.5 0 0 0-.277.853l1.187 1.156-.28 1.633a.5.5 0 0 0 .725.528L8 10.286l1.467.772a.499.499 0 0 0 .725-.528l-.28-1.633L11.1 7.741a.5.5 0 0 0 .127-.512Z"
      />
    </svg>
  );
}
