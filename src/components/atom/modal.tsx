import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import cn from '@/lib/utils/cn';
import { useModal } from '../modal-views/use-modal';

const modalStyles = {
  overlay: 'fixed inset-0 cursor-pointer bg-black/70',
};

export type ModalProps = {
  isOpen: boolean;
  onClose(): void;
  overlayClassName?: string;
  containerClassName?: string;
  className?: string;
};

export function Modal({ isOpen, onClose, overlayClassName, containerClassName, className, children }: React.PropsWithChildren<ModalProps>) {
  const TransitionComponent: React.ElementType = Transition;
  const TransitionChild: React.ElementType = Transition.Child;

  const { disabledClose } = useModal();

  const onCloseHandler = disabledClose ? () => {} : onClose;

  return (
    <TransitionComponent appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onCloseHandler}
        className={cn(
          `modal-root`,
          'fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden',
          disabledClose && 'pointer-events-none',
          className
        )}
      >
        <div className={cn('flex min-h-screen flex-col items-center justify-center')}>
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={cn(`modal-overlay`, modalStyles.overlay, overlayClassName)} />
          </TransitionChild>

          <button type="button" className="sr-only">
            Sr Only
          </button>
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="pointer-events-none relative w-full transform overflow-hidden transition-all">
              <div
                className={cn(
                  `modal-container`,
                  'bg-background pointer-events-auto m-auto w-full break-words shadow-xl',
                  containerClassName
                )}
              >
                {children}
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionComponent>
  );
}

Modal.displayName = 'Modal';
