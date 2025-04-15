'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

import cn from '@/lib/utils/cn';

import { useDisableModalClose } from './use-disable-modal-close';

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  containerClassName?: string;
  closeOnPathnameChange?: boolean;
  onCloseHandler?: () => void;
  data?: object;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  containerClassName: 'bg-white',
  closeOnPathnameChange: true,
  onCloseHandler: () => {},
  data: {},
});

type UseModal = {
  onClose?: () => void;
};

export function useModal<T extends Record<string, unknown>>(
  { onClose }: UseModal = { onClose: () => {} }
) {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);
  const { setDisable, disabled } = useDisableModalClose();

  const openModal = ({
    view,
    containerClassName,
    closeOnPathnameChange = true,
    data,
  }: {
    view: React.ReactNode;
    containerClassName?: string;
    closeOnPathnameChange?: boolean;
    data?: T;
  }) => {
    setState({
      ...state,
      closeOnPathnameChange,
      isOpen: true,
      view,
      containerClassName: cn('bg-white', containerClassName),
      onCloseHandler: onClose,
      data: data as T,
    });
  };

  const closeModal = (cb: () => void = () => {}) => {
    if (disabled) return;
    state.onCloseHandler?.();
    setState({
      ...state,
      onCloseHandler: () => {},
      view: null,
      isOpen: false,
    });
    onClose?.();
    cb?.();
  };

  return {
    ...state,
    data: state.data as T,
    openModal,
    closeModal,
    disabledClose: disabled,
    setDisableClose: setDisable,
  };
}
