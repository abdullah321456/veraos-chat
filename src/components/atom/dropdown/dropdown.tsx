'use client';

import React from 'react';

import { type Placement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { Menu } from '@headlessui/react';

import cn from '@/lib/utils/cn';

import { DropdownProvider } from './dropdown-context';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';
import { DropdownTrigger } from './dropdown-trigger';
import { ExtractProps } from '@/types';

export type DropdownProps = ExtractProps<typeof Menu> & {
  inPortal?: boolean;
  placement?: Placement;
  children: React.ReactNode;
  className?: string;
};

export function Dropdown({ inPortal = true, placement = 'bottom-start', children, className }: DropdownProps) {
  const { x, y, refs, strategy } = useFloating({
    placement,
    middleware: [
      flip(),
      shift(),
      offset({
        mainAxis: 6,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <DropdownProvider value={{ refs, x, y, strategy, inPortal }}>
      <Menu as="div" ref={refs.setReference} className={cn(`dropdown-root inline-block rounded-md`, 'relative', className)}>
        {({ open }) => (
          <>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === DropdownTrigger) {
                return child;
              }
              if (React.isValidElement(child) && child.type === DropdownMenu) {
                return open ? child : null;
              }
              return null;
            })}
          </>
        )}
      </Menu>
    </DropdownProvider>
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

Dropdown.displayName = 'Dropdown';
