'use client';

import { Collapse } from '@/components/atom/collapse';
import cn from '@/lib/utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PropsWithChildren, SVGProps } from 'react';

type AccordionProps = {
  title: React.ReactNode;
  actionButton?: React.ReactNode;
  headerClassName?: string;
  className?: string;
  onClickTranslate?: () => void;
  translateButton: boolean;
};
type Props = PropsWithChildren<AccordionProps>;
export function Accordion({ children, title, actionButton, onClickTranslate, translateButton, className }: Props) {
  return (
    <Collapse
      defaultOpen
      className={className}
      header={({ open, toggle }) => (
        <div className="flex items-center justify-between cursor-pointer mb-4" onClick={toggle}>
          <p className="text-base text-black font-bold flex gap-2 items-center">
            {title} {translateButton && <TranslateButton onClickTranslate={onClickTranslate} />}
          </p>
          <div className="flex items-center gap-4">
            <span className={cn('invisible', open && 'visible')}>{actionButton}</span>
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      )}
    >
      {children}
    </Collapse>
  );
}

export function ActionButton({ mode }: { mode: 'edit' | 'save' }) {
  return <button>{mode}</button>;
}

function TranslateButton({ onClickTranslate }: { onClickTranslate?: () => void }) {
  return <></>;
  // return (
  //   <span
  //     onClick={(e) => {
  //       e.stopPropagation();
  //       onClickTranslate?.();
  //     }}
  //     role="button"
  //     className="flex items-center gap-1 text-xs text-gray-500"
  //   >
  //     <TranslateIcon className="w-4 h-4" />
  //     Translate
  //   </span>
  // );
}

const TranslateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M16.23 6.729H9.103a1.982 1.982 0 0 0-1.979 1.98v4.75a1.982 1.982 0 0 0 1.98 1.978h3.992l1.723 1.724a.593.593 0 0 0 1.013-.42v-1.304h.396a1.982 1.982 0 0 0 1.98-1.979v-4.75a1.981 1.981 0 0 0-1.98-1.979Zm-1.584 3.76h-.221a3.552 3.552 0 0 1-1.054 2.151c.34.147.707.223 1.077.224a.408.408 0 0 1 .384.546.383.383 0 0 1-.356.246 3.612 3.612 0 0 1-1.801-.487 3.535 3.535 0 0 1-1.79.487.408.408 0 0 1-.384-.546.384.384 0 0 1 .356-.246 2.82 2.82 0 0 0 1.113-.227 3.504 3.504 0 0 1-.742-1.018.395.395 0 1 1 .715-.34c.17.36.417.677.721.931a2.755 2.755 0 0 0 .96-1.72h-2.937a.396.396 0 1 1 0-.792h1.584v-.792a.396.396 0 1 1 .791 0v.792h1.584a.396.396 0 1 1 0 .791ZM6.333 5.707l-.645 1.418h1.146c.028-.04.059-.08.09-.119l-.59-1.3Z"
    />
    <path
      fill="currentColor"
      d="M9.896 2.375H2.771a1.982 1.982 0 0 0-1.979 1.98v4.75a1.982 1.982 0 0 0 1.98 1.978h.395v1.304a.594.594 0 0 0 1.014.42l1.723-1.724h.43V8.708c0-.268.04-.535.118-.791H5.33l-.614 1.351a.396.396 0 0 1-.72-.328l1.978-4.354a.396.396 0 0 1 .72 0l.839 1.844a2.752 2.752 0 0 1 1.572-.492h2.771V4.354a1.981 1.981 0 0 0-1.979-1.979Z"
    />
  </svg>
);
