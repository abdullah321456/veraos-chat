'use client';

import React, { Fragment } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { Menu, Transition } from '@headlessui/react';

import cn from '@/lib/utils/cn';

import { useDropdown } from './dropdown-context';
import { dropdownStyles } from './dropdown-styles';

type DropdownMenuProps = {
  as?: 'ul' | 'div';
  className?: string;
  gap?: { x?: number; y?: number };
  style?: React.CSSProperties;
};

export function DropdownMenu({
  as = 'div',
  className,
  children,
  gap = { x: 0, y: 0 },
  style,
}: React.PropsWithChildren<DropdownMenuProps>) {
  const { inPortal, refs, strategy, x, y } = useDropdown();
  const TransitionComponent: React.ElementType = Transition;
  const MenuItems: React.ElementType = Menu.Items;

  const PortalComponent = inPortal ? FloatingPortal : Fragment;

  return (
    <PortalComponent>
      <TransitionComponent
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          as={as}
          ref={refs.setFloating}
          data-testid="dropdown-menu"
          className={cn(
            `dropdown-menu rounded-md`,
            'w-48 z-[9999]',
            dropdownStyles.base,
            className
          )}
          style={{
            position: strategy,
            top: (y ?? 0) + (gap?.y ?? 0),
            left: (x ?? 0) + (gap?.x ?? 0),
            zIndex: 9999,
            ...style,
          }}
        >
          {children}
        </MenuItems>
      </TransitionComponent>
    </PortalComponent>
  );
}

DropdownMenu.displayName = 'DropdownMenu';
