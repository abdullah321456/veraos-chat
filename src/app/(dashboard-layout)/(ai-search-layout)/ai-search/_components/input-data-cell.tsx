'use client';

import cn from '@/lib/utils/cn';
import { useEffect, useState } from 'react';

type InputDataCellProps = {
  label: string;
  value?: string;
  onDone?: (value?: string) => void;
  editable?: boolean;
};

export function InputDataCell({ label, value, onDone, editable }: InputDataCellProps) {
  const prevValue = value;
  const [isBlank, setIsBlank] = useState(!value);
  const [isDone, setIsDone] = useState(false);
  const [focused, setFocused] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const requiredDone = prevValue !== newValue;

  function handleDone() {
    if (!editable) return;
    if (requiredDone) onDone?.(newValue);
    setIsDone(true);
    setFocused(false);
  }

  function handleFocus() {
    if (!editable) return;

    setFocused(true);
  }

  function handleBlur() {
    if (!editable) return;

    if (requiredDone && !isDone) return;
    setFocused(false);
  }

  useEffect(() => {
    if (!editable) return;
    if (requiredDone && !isDone) setIsDone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, newValue]);

  if (editable && isBlank) {
    return (
      <button
        onClick={() => {
          setIsBlank(false);
          setFocused(true);
        }}
        className="rounded-md text-xs px-2.5 py-1.5 border-dashed border-2 border-primary font-medium text-primary h-14 flex items-center justify-center cursor-pointer"
      >
        + Add {label}
      </button>
    );
  }

  return (
    <div
      className={cn(
        'ring-[1px] min-h-14 text-xs ring-gray-200 rounded-md px-2.5 py-1.5 border-dashed border-2 border-primary/0',
        focused && ' border-primary ring-gray-200/0'
      )}
    >
      <div className="flex justify-between w-full mb-1.5 relative">
        <p className="whitespace-nowrap text-gray-600">{label}</p>
        {requiredDone && !isDone && (
          <button onClick={handleDone}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] absolute -top-0.5 -right-1"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                fill="#5C39D9"
                d="M14.804 5.7a.765.765 0 0 0-1.109 0l-5.937 5.937-2.454-2.454a.765.765 0 0 0-1.108 0 .765.765 0 0 0 0 1.109L7.204 13.3a.718.718 0 0 0 .554.237.718.718 0 0 0 .554-.237l6.492-6.492a.765.765 0 0 0 0-1.108Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div>
        {editable ? (
          <input
            autoFocus={false}
            type="text"
            value={newValue || '-'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setNewValue(e.target.value)}
            className="focus:outline-none w-full text-[13px] font-semibold"
          />
        ) : (
          <p className="text-[13px] font-semibold">{newValue || value}</p>
        )}
      </div>
    </div>
  );
}
