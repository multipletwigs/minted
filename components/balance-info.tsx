"use client";

import { useAccount } from "@solana/react-hooks";
import { AddressLike } from "@solana/client";
import { AnimatePresence, motion } from "motion/react";
import { InfoRow } from "./info-row";
import { InfoHeader } from "./info-header";
import type { InfoCardConfig } from "@/lib/card-configs";
import { getSolscanUrl } from "@/lib/utils";

interface BalanceInfoProps {
  address: AddressLike;
  config: InfoCardConfig;
}

type AccountData = {
  data: [string, string];
  space: bigint;
  rentEpoch: bigint;
};

// u64::MAX means rent-exempt
const MAX_U64 = BigInt("18446744073709551615");

function formatRentEpoch(rentEpoch: bigint | undefined): string {
  if (rentEpoch === undefined) return "—";
  if (rentEpoch === MAX_U64) return "Exempt";
  return `Epoch ${rentEpoch.toLocaleString()}`;
}

export function BalanceInfo({ address, config }: BalanceInfoProps) {
  const account = useAccount(address, { watch: true });
  const lamports = account?.lamports ?? null;
  const isLoading = account?.fetching;
  const error = account?.error;
  const data = account?.data as AccountData | undefined;

  if (!account) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <InfoHeader title={config.title} description={config.description} patternIndex={0} />
      <div className="flex flex-col gap-2.5 px-4 pt-3 pb-4 text-sm">
        <AnimatePresence mode="wait">
          {isLoading && lamports === null && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs opacity-60 animate-pulse"
            >
              Fetching account...
            </motion.div>
          )}

          {!error && lamports !== null && (
            <motion.div
              key="data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2.5"
            >
              <InfoRow
                label="Owner"
                description="Program that controls this account"
                value={account.owner ? (
                  <a
                    href={getSolscanUrl(account.owner.toString())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline"
                  >
                    {`${account.owner.toString().slice(0, 4)}...${account.owner.toString().slice(-4)}`}
                  </a>
                ) : "—"}
              />

              <InfoRow
                label="Space"
                description="Bytes allocated on-chain"
                value={`${data?.space?.toString() ?? "—"} bytes`}
              />

              <InfoRow
                label="Lamports"
                description="SOL locked for rent"
                value={lamports?.toLocaleString() ?? "—"}
              />

              <InfoRow
                label="Executable"
                description="Is this a program?"
                value={account.executable ? "Yes" : "No"}
              />

              <InfoRow
                label="Rent Epoch"
                description="When rent was last collected"
                value={formatRentEpoch(data?.rentEpoch)}
              />
            </motion.div>
          )}

          {!!error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs opacity-60"
            >
              Error fetching account
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
