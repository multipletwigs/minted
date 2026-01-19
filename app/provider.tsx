'use client';

import { createDefaultClient } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';
import { SelectionProvider } from '@/contexts/selection-context';
import type { ReactNode } from 'react';

const isDev = process.env.NODE_ENV === 'development';

function getRpcEndpoint() {
  if (isDev) return 'devnet';
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/rpc`;
  }
  return process.env.NEXT_PUBLIC_APP_URL + '/api/rpc';
}

export function Providers({ children }: { children: ReactNode }) {
  const client = createDefaultClient({
    endpoint: getRpcEndpoint(),
  });
  return (
    <SolanaProvider client={client}>
      <SelectionProvider>{children}</SelectionProvider>
    </SolanaProvider>
  );
}
