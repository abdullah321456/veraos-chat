'use client';

import React from 'react';
import { Menu } from '@headlessui/react';
import cn from '@/lib/utils/cn';

export const dropdownItemStyles = {
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-[4px]',
    lg: 'rounded-md',
    xl: 'rounded-lg',
  },
};

export type DropdownItemProps<T extends React.ElementType = 'button'> = {
  as?: T;
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<T>; // Use ComponentPropsWithoutRef to infer props based on the element type

export const DropdownItem = <T extends React.ElementType = 'button'>({
  as,
  className,
  children,
  disabled,
  activeClassName,
  disabledClassName,
  ...props
}: DropdownItemProps<T>) => {
  const Component = as || 'button';

  return (
    <Menu.Item disabled={disabled}>
      {({ active, disabled }) => (
        <Component
          {...(Component === 'button' && { type: 'button' })}
          className={cn(
            `dropdown-item`,
            'flex w-full items-center rounded-md px-3 py-1.5',
            active && ['bg-muted/70', activeClassName],
            disabled && disabledClassName,
            className
          )}
          {...props}
        >
          {children}
        </Component>
      )}
    </Menu.Item>
  );
};

DropdownItem.displayName = 'DropdownItem';