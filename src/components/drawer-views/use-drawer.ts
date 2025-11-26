'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

import cn from '@/lib/utils/cn';

export type DrawerPlacements = 'left' | 'right' | 'top' | 'bottom';

type OpenDrawerHandlerConfigType = {
  view: React.ReactNode;
  placement?: DrawerPlacements;
  customSize?: string;
  closeOnPathnameChange?: boolean;
  containerClassName?: string;
  onTopOfModal?: boolean;
};

export type OpenDrawerHandlerType = ({
  view,
  placement,
  customSize,
  closeOnPathnameChange,
  containerClassName,
  onTopOfModal,
}: OpenDrawerHandlerConfigType) => void;

export type CloseDrawerHandlerType = (cb?: () => void) => void;

type DrawerTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  placement?: DrawerPlacements;
  customSize?: string;
  closeOnPathnameChange?: boolean;
  containerClassName?: string;
  onTopOfModal?: boolean;
  onCloseHandler?: () => void;
};

const drawerAtom = atom<DrawerTypes>({
  isOpen: false,
  view: null,
  placement: 'right',
  customSize: '320px',
  closeOnPathnameChange: true,
  containerClassName: 'w-full sm:w-[500px] bg-white',
  onTopOfModal: false,
  onCloseHandler: () => {},
});

type UseDrawerOptions = {
  onClose?: () => void;
};

export function useDrawer(
  { onClose }: UseDrawerOptions = { onClose: () => {} }
) {
  const state = useAtomValue(drawerAtom);
  const setState = useSetAtom(drawerAtom);

  const openDrawer = ({
    view,
    placement = 'right',
    customSize,
    closeOnPathnameChange = true,
    containerClassName,
    onTopOfModal,
  }: OpenDrawerHandlerConfigType) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      customSize,
      onCloseHandler: onClose,
      closeOnPathnameChange,
      containerClassName: cn('w-full sm:w-[500px] bg-white', containerClassName),
      onTopOfModal,
    });
  };

  const closeDrawer = (cb: () => void = () => {}) => {
    state.onCloseHandler?.();
    cb?.();
    // onClose?.();
    setState({
      ...state,
      onCloseHandler: () => {},
      isOpen: false,
    });
  };

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
