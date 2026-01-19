'use client';

import { createDefaultClient } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';
import { SelectionProvider } from '@/contexts/selection-context';
import type { ReactNode } from 'react';


export function Providers({ children }: { children: ReactNode }) {
  const client = createDefaultClient()
  return (
    <SolanaProvider client={client}>
      <SelectionProvider>{children}</SelectionProvider>
    </SolanaProvider>
  );
}
