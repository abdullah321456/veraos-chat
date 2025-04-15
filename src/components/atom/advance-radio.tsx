import cn from '@/lib/utils/cn';
import React, { forwardRef } from 'react';

export interface AdvancedRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  inputClassName?: string;
  className?: string;
}

export const AdvancedRadio = forwardRef<HTMLInputElement, AdvancedRadioProps>(({ children, inputClassName, className, ...props }, ref) => (
  <label className={cn('relative block', className)}>
    <input type="radio" ref={ref} className={cn('peer invisible absolute -z-[1] opacity-0', inputClassName)} {...props} />
    {children}
  </label>
));

AdvancedRadio.displayName = 'AdvancedRadio';
