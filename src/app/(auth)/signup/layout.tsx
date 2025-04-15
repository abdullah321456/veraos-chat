'use client';

import { SignupProvider } from './context/signup.context';

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignupProvider>
      {children}
    </SignupProvider>
  );
} 