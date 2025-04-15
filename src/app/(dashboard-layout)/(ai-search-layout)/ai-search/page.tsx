'use client';

import dynamic from 'next/dynamic';

const Conversation = dynamic(() => import('./_view/conversation').then((mod) => mod.Conversation), {
  ssr: false,
  loading: () => 'Loading...',
});

export default function Page() {
  return (
    <div>
      <Conversation />
    </div>
  );
}
