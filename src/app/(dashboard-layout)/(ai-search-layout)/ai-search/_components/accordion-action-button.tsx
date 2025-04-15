'use client';
import cn from '@/lib/utils/cn';
import { Dispatch, SetStateAction } from 'react';
import { PiPencilLine } from 'react-icons/pi';

type AccordionActionButtonProps = {
  mode: 'edit' | 'save';
  onClick?: () => void;
  className?: string;
  setEditable: Dispatch<SetStateAction<boolean>>;
};

export function AccordionActionButton({ mode, onClick, className, setEditable }: AccordionActionButtonProps) {
  return (
    <div className="flex gap-2">
      {mode === 'save' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditable(false);
          }}
          className={cn('capitalize text-xs flex items-center gap-1.5 rounded px-2 py-1 text-red-500 bg-red-100')}
        >
          Cancel
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className={cn(
          'capitalize text-xs flex items-center gap-1.5 rounded px-2 py-1',
          mode === 'edit' ? 'bg-gray-200 ' : 'bg-primary text-white',
          className
        )}
      >
        {mode === 'edit' ? <PiPencilLine size={16} /> : <SaveIcon />} {mode}
      </button>
    </div>
  );
}

function SaveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px]" viewBox="0 0 19 19" fill="none">
      <path
        fill="currentColor"
        d="M14.804 5.7a.765.765 0 0 0-1.109 0l-5.937 5.937-2.454-2.454a.765.765 0 0 0-1.108 0 .765.765 0 0 0 0 1.109L7.204 13.3a.718.718 0 0 0 .554.237.718.718 0 0 0 .554-.237l6.492-6.492a.765.765 0 0 0 0-1.108Z"
      />
    </svg>
  );
}
