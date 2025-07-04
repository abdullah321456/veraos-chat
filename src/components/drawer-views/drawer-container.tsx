'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import cn from '@/lib/utils/cn';

import { Drawer } from '@/components/atom/drawer';

// import { useModal } from '../modal-views/use-modal';
import { useDrawer } from './use-drawer';

export default function DrawerContainer() {
  // const { isOpen: isModalOpen } = useModal();
  const {
    isOpen,
    view,
    placement,
    // customSize,
    closeDrawer,
    closeOnPathnameChange,
    containerClassName,
    onTopOfModal,
    onCloseHandler,
  } = useDrawer();
  const pathname = usePathname();
  useEffect(() => {
    if (closeOnPathnameChange) {
      closeDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function handleClose() {
    closeDrawer()
    onCloseHandler?.();
    // if (onTopOfModal) {
    //   return closeDrawer();
    // } else {
    //   if (isModalOpen) closeDrawer();
    // }
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      placement={placement}
      // customSize={customSize}
      containerClassName={containerClassName}
      className={cn(onTopOfModal ? 'z-[999999]' : 'z-[9999]')}
    >
      {view}
    </Drawer>
  );
}
