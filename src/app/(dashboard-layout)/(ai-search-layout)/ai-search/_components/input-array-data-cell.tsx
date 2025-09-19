'use client';

import cn from '@/lib/utils/cn';
import { useState, useEffect } from 'react';
import { PiTrash } from 'react-icons/pi';

type InputDataCellProps = {
  label: string;
  values?: string[];
  onDone?: (value?: string) => void;
  editable?: boolean;
  entryPrefix?: React.ReactNode;
  addButtonLabel?: React.ReactNode;
  serial?: boolean;
  bullet?: boolean;
  rowClassName?: string;
  rowWrapperClassName?: string;
  rowTextClassName?: string;
  valueClassName?: string;
  newField?: React.ReactNode;
  blockRemoveButton?: boolean;
  onBlockRemove?: () => void;
};

export function InputArrayDataCell({
  label,
  values,
  entryPrefix,
  onDone,
  editable,
  addButtonLabel,
  serial,
  bullet,
  rowClassName,
  rowWrapperClassName,
  rowTextClassName,
  valueClassName,
  newField,
  blockRemoveButton,
  onBlockRemove,
}: InputDataCellProps) {
  const prevValues = values ?? [];
  const [newValue, setNewValue] = useState('');
  const [newFieldState, setNewFieldState] = useState(newField ?? false);
  const [allValues, setAllValues] = useState([...prevValues]);

  // Ensure allValues updates when values prop changes
  useEffect(() => {
    setAllValues([...prevValues]);
  }, [JSON.stringify(prevValues)]);

  const handleDone = () => {
    if (!editable) return;
    setAllValues((prev) => [...prev, newValue]);
    setNewValue('');
    setNewFieldState(false);
    onDone?.(newValue);
  };

  function remove(index: number) {
    if (!editable) return;
    setAllValues((prev) => prev.filter((_, i) => i !== index));
  }

  const addButton = (
    <button onClick={() => setNewFieldState(true)} className="text-primary text-xs">
      +Add {addButtonLabel && addButtonLabel}
    </button>
  );
  const doneButton = (
    <button onClick={handleDone} className="text-primary text-xs">
      Done
    </button>
  );

  const removeButton = (
    <button
      onClick={() => {
        if (blockRemoveButton) {
          onBlockRemove?.();
          return;
        }
        remove(allValues.length - 1);
      }}
      className="text-red-500 text-xs"
    >
      - Remove
    </button>
  );

  const doneButtonVisibility = newValue && newFieldState;

  return (
    <div className="border rounded-lg py-2 px-2.5">
      <div className="flex justify-between relative mb-2.5">
        <p className="text-xs">{label}</p>
        {editable && (
          <div className="flex gap-2">
            <>{blockRemoveButton && removeButton}</>
            <>{!newFieldState && !newValue && addButton}</>
            <>{doneButtonVisibility && doneButton}</>
          </div>
        )}
      </div>
      <div className={cn('space-y-2.5', rowWrapperClassName)}>
        {allValues.map((val, index) => {
          const hasValueLabel = val?.includes(':');
          const valueLabel = hasValueLabel ? val?.split(':')[0] : '';
          const value = hasValueLabel ? val?.split(':')[1] : val;
          return (
            <div
              className={cn('flex justify-between items-center relative pe-7 gap-2 text-xs rounded bg-gray-50 px-3 py-3', rowClassName)}
              key={index}
            >
              <div className="flex items-start gap-1.5">
                {bullet && <Bullet />}
                {!!entryPrefix && entryPrefix}
                {serial && <span>{index + 1}.</span>}
                <p title={val} className={cn('break-all', rowTextClassName)}>
                  {hasValueLabel && <span className="font-semibold">{valueLabel + ':'}</span>}
                  {valueLabel?.toLowerCase() === 'facebook' && value ? (
                    <a 
                      href={`https://facebook.com/${value.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(valueClassName, 'hover:underline cursor-pointer')}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={valueClassName}>{value}</span>
                  )}
                </p>
              </div>
              {editable && (
                <button onClick={() => remove(index)} className="text-red-500 absolute top-1/2 translate-y-[-50%] right-1.5">
                  <PiTrash size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {newFieldState && editable && (
        <div className="relative mt-4 mb-1 pr-8">
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full rounded-md text-xs px-3 py-2 border-dashed border-2 bg-primary/10 border-primary font-medium focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleDone()}
          />
          <button onClick={() => setNewFieldState(false)} className="text-red-500 absolute top-1/2 right-2 -translate-y-1/2">
            <PiTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function Bullet() {
  return <span className="inline-block min-w-1.5 max-w-1.5 h-1.5 rounded-full bg-gray-700 mt-[5px]" />;
}
