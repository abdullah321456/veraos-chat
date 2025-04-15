'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import cn from '@/lib/utils/cn';

import { Modal } from '@/components/atom/modal';

import { useModal } from './use-modal';

export default function ModalContainer() {
  const {
    isOpen,
    view,
    closeModal,
    closeOnPathnameChange,
    containerClassName,
    onCloseHandler,
    disabledClose,
  } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    if (closeOnPathnameChange) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function handleClose() {
    if (disabledClose) return;
    closeModal();
    onCloseHandler?.();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      containerClassName={cn('rounded-[10px]', containerClassName)}
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      {view}
    </Modal>
  );
}
