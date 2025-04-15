'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function PageLoader() {
  return <ProgressBar height="2px" color="#5C39D9" options={{ showSpinner: false }} shallowRouting />;
}
