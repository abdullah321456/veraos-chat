'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Conversation = dynamic(() => import('./_view/conversation').then((mod) => mod.Conversation), {
  ssr: false,
  loading: () => 'Loading...',
});

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're coming from login by checking session storage
    const fromLogin = sessionStorage.getItem('fromLogin');
    if (fromLogin) {
      // Clear the flag
      sessionStorage.removeItem('fromLogin');
      // Refresh the page
      window.location.reload();
    }
  }, [pathname]);

  return (
    <div className="ml-[30px]">
      <Conversation />
    </div>
  );
}
