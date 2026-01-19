import { Suspense, type ReactNode } from "react";
import { BalanceInfo } from "@/components/balance-info";
import { BlockhashInfo } from "@/components/blockhash-info";
import { ClusterInfo } from "@/components/cluster-info";
import { toAddress } from "@solana/client";

export type InfoCardConfig = {
  x: number;
  title: string;
  description: string;
  component: (props: { address: string; config: InfoCardConfig }) => ReactNode;
};

export const stackedCardConfigs: InfoCardConfig[] = [
  {
    x: 20,
    title: "Account",
    description: "Everything is an account — programs, tokens, wallets",
    component: ({ address, config }) => (
      <Suspense fallback={<div className="p-4 text-xs opacity-60">Loading...</div>}>
        <BalanceInfo address={toAddress(address)} config={config} />
      </Suspense>
    ),
  },
  {
    x: 40,
    title: "Blockhash",
    description: "Recent block hash required to sign transactions",
    component: ({ config }) => (
      <Suspense fallback={<div className="p-4 text-xs opacity-60">Loading...</div>}>
        <BlockhashInfo config={config} />
      </Suspense>
    ),
  },
  {
    x: 60,
    title: "Cluster",
    description: "Solana runs multiple networks for different purposes",
    component: ({ config }) => (
      <Suspense fallback={<div className="p-4 text-xs opacity-60">Loading...</div>}>
        <ClusterInfo config={config} />
      </Suspense>
    ),
  },
];
