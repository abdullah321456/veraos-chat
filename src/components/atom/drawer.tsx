import React, { Fragment, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { useDocumentScrollbarWidth } from '@/lib/hooks/use-document-scrollbar-width';
import cn from '@/lib/utils/cn';

export const drawerClasses = {
  overlay: 'fixed inset-0 cursor-pointer bg-black/70 transition-opacity',
  placement: {
    top: '-translate-y-full',
    right: 'translate-x-full',
    bottom: 'translate-y-full',
    left: '-translate-x-full',
  },
};

export type DrawerProps = {
  isOpen: boolean;
  onClose(): void;
  placement?: keyof typeof drawerClasses.placement;
  overlayClassName?: string;
  containerClassName?: string;
  className?: string;
};

export function Drawer({
  isOpen,
  onClose,
  placement = 'right',
  overlayClassName,
  containerClassName,
  className,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  const scrollbarWidth = useDocumentScrollbarWidth();
  const portalRef = useRef<HTMLElement | null>(null);

  // Create the portal div if it doesn't exist
  useEffect(() => {
    const existingPortal = document.getElementById('drawer-portal');
    if (!existingPortal) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'drawer-portal';
      document.body.appendChild(portalDiv);
      portalRef.current = portalDiv;
    } else {
      portalRef.current = existingPortal; // Removed the optional chaining
    }

    return () => {
      if (portalRef.current && !portalRef.current.hasChildNodes()) {
        portalRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }, [isOpen, scrollbarWidth]);

  // Render the drawer content
  const drawerContent = (
    <div className={cn(`drawer-root`, 'fixed -right-full z-[999999] overflow-hidden duration-500', isOpen && 'right-0', className)}>
      <div
        onClick={onClose}
        className={cn(
          'pointer-events-none fixed left-0 top-0 h-[200vh] w-screen bg-black/0 duration-300 invisible',
          isOpen && 'isOpen pointer-events-auto bg-black/70 opacity-100 visible',
          overlayClassName
        )}
      />
      <button type="button" className="sr-only">
        Sr Only
      </button>

      <div
        className={cn(
          `drawer-container`,
          'bg-gray-200 fixed h-full w-full break-words shadow-xl transition-[right] duration-500',
          placement === 'top' && 'top-0',
          placement === 'right' && 'inset-y-0 right-0',
          placement === 'bottom' && 'bottom-0',
          placement === 'left' && 'inset-y-0 left-0',
          containerClassName,
          '-right-full',
          isOpen && 'right-0'
        )}
      >
        <Fragment key={String(isOpen)}>{children}</Fragment>
      </div>
    </div>
  );

  // Use the portal if it is created
  if (portalRef.current) {
    return ReactDOM.createPortal(drawerContent, portalRef.current);
  }

  return null;
}

Drawer.displayName = 'Drawer';
