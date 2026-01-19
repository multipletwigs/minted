"use client";

import { useLatestBlockhash, useClusterState } from "@solana/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { InfoRow } from "./info-row";
import { InfoHeader } from "./info-header";
import type { InfoCardConfig } from "@/lib/card-configs";

interface BlockhashInfoProps {
  config: InfoCardConfig;
}

export function BlockhashInfo({ config }: BlockhashInfoProps) {
  const { blockhash, lastValidBlockHeight, contextSlot, isLoading, error } = useLatestBlockhash({
    refreshInterval: 5000,
  });
  const cluster = useClusterState();

  const truncatedBlockhash = blockhash
    ? `${blockhash.slice(0, 8)}...${blockhash.slice(-8)}`
    : null;

  const blocksRemaining = lastValidBlockHeight && contextSlot
    ? Number(lastValidBlockHeight) - Number(contextSlot)
    : null;

  const secondsRemaining = blocksRemaining ? Math.floor(blocksRemaining * 0.4) : null;

  return (
    <div className="flex flex-col h-full">
      <InfoHeader title={config.title} description={config.description} patternIndex={1} />
      <div className="flex flex-col gap-2.5 px-4 pt-3 pb-4 text-sm">
        <AnimatePresence mode="wait">
          {isLoading && !blockhash && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs opacity-60 animate-pulse"
            >
              Fetching blockhash...
            </motion.div>
          )}

          {!error && blockhash && (
            <motion.div
              key="data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2.5"
            >
              <InfoRow
                label="Blockhash"
                description="Recent block's unique hash"
                value={truncatedBlockhash}
              />

              <InfoRow
                label="Current Slot"
                description="Latest processed block"
                value={contextSlot?.toLocaleString() ?? "—"}
              />

              <InfoRow
                label="Valid Until"
                description="TX rejected after this block"
                value={`Block #${lastValidBlockHeight?.toLocaleString() ?? "—"}`}
              />

              <InfoRow
                label="Blocks Left"
                description="~150 blocks until expiry"
                value={blocksRemaining?.toLocaleString() ?? "—"}
              />

              <InfoRow
                label="Time Left"
                description="~400ms per slot"
                value={secondsRemaining ? `~${secondsRemaining}s` : "—"}
              />

              <InfoRow
                label="Commitment"
                description="Confirmation level used"
                value={cluster.commitment ?? "confirmed"}
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
              Error fetching blockhash
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
