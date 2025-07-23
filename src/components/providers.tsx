"use client";

import { ClerkProvider } from '@clerk/nextjs';
import getConfig from 'next/config';

export function Providers({ children }: { children: React.ReactNode }) {
  const { publicRuntimeConfig } = getConfig();
  const { clerkPublishableKey } = publicRuntimeConfig;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {children}
    </ClerkProvider>
  );
}
