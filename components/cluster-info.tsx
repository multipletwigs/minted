"use client";

import { useClusterState, useClusterStatus } from "@solana/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { InfoRow } from "./info-row";
import { InfoHeader } from "./info-header";
import type { InfoCardConfig } from "@/lib/card-configs";

interface ClusterInfoProps {
  config: InfoCardConfig;
}

export function ClusterInfo({ config }: ClusterInfoProps) {
  const cluster = useClusterState();
  const status = useClusterStatus();

  const getStatusColor = () => {
    switch (status.status) {
      case "ready":
        return "bg-green-400";
      case "connecting":
        return "bg-yellow-400 animate-pulse";
      case "error":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = () => {
    switch (status.status) {
      case "ready":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  const getNetworkName = (endpoint: string) => {
    if (endpoint.includes("mainnet")) return "Mainnet-Beta";
    if (endpoint.includes("devnet")) return "Devnet";
    if (endpoint.includes("testnet")) return "Testnet";
    if (endpoint.includes("localhost") || endpoint.includes("127.0.0.1")) return "Localnet";
    return "Custom";
  };

  const getCommitmentDescription = (commitment: string) => {
    switch (commitment) {
      case "processed":
        return "Fastest, may be rolled back";
      case "confirmed":
        return "Optimistic, 66%+ stake voted";
      case "finalized":
        return "Slowest, cannot be rolled back";
      default:
        return "Transaction confirmation level";
    }
  };

  const truncatedEndpoint = cluster.endpoint
    ? cluster.endpoint.length > 25
      ? `${cluster.endpoint.slice(0, 25)}...`
      : cluster.endpoint
    : "—";

  const networkName = cluster.endpoint ? getNetworkName(cluster.endpoint) : "Unknown";
  const commitment = cluster.commitment ?? "confirmed";

  return (
    <div className="flex flex-col h-full">
      <InfoHeader title={config.title} description={config.description} patternIndex={2} />
      <div className="flex flex-col gap-2.5 px-4 pt-3 pb-4 text-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key="data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2.5"
          >
            <InfoRow
              label="Status"
              description="RPC connection health"
              value={
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`} />
                  {getStatusLabel()}
                </span>
              }
            />

            <InfoRow
              label="Network"
              description="Which Solana cluster"
              value={networkName}
            />

            <InfoRow
              label="Commitment"
              description={getCommitmentDescription(commitment)}
              value={commitment}
            />

            <InfoRow
              label="Processed"
              description="Node has seen TX"
              value="~0ms"
            />

            <InfoRow
              label="Confirmed"
              description="Supermajority voted"
              value="~400ms"
            />

            <InfoRow
              label="Finalized"
              description="31+ blocks passed"
              value="~12s"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
