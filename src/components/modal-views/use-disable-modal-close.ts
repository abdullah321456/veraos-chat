'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

type Types = {
  disabled: boolean;
};

const modalAtom = atom<Types>({
  disabled: false,
});

export function useDisableModalClose() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  function setDisable(disabled: boolean) {
    setState({
      ...state,
      disabled,
    });
  }

  return {
    ...state,
    setDisable,
  };
}
