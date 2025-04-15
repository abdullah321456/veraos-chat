'use client';

import DrawerContainer from '@/components/drawer-views/drawer-container';
import ModalContainer from '@/components/modal-views/modal-container';
import { PageLoader } from '@/components/page-loader';
import { Provider, createStore } from 'jotai';

const store = createStore();
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <>{children}</>
      <PageLoader />
      <ModalContainer />
      <DrawerContainer />
    </Provider>
  );
}
