'use client';

import React from 'react';

import { Menu } from '@headlessui/react';

import cn from '@/lib/utils/cn';

type DropdownButtonProps = {
  as?: 'button' | 'div';
  className?: string;
  ref: React.ForwardedRef<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropdownTrigger = ({ as = 'div', className, children, ...props }: DropdownButtonProps) => {
  const Component = as;
  const MenuButton: React.ElementType = Menu.Button;

  return (
    <MenuButton
      as={as}
      // ref={props.ref}
      {...(Component === 'button' && { type: 'button' })}
      className={cn(`dropdown-button`, className)}
      {...props}
    >
      {children}
    </MenuButton>
  );
};

DropdownTrigger.displayName = 'DropdownTrigger';
