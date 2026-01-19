"use client";

import { truncateAddress, getSolscanUrl } from "@/lib/utils";
import { motion } from "motion/react";
import type { TokenInfo } from "@/lib/tokens";

interface CoinInfoProps {
  token: TokenInfo;
}

export function CoinInfo({ token }: CoinInfoProps) {
  return (
    <div className="flex text-primary-foreground flex-col gap-3 px-4 pb-4 text-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold">{token.name}</span>
          <a
            href={getSolscanUrl(token.address)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs opacity-60 font-mono hover:opacity-100 hover:underline transition-opacity"
          >
            {truncateAddress(token.address)}
          </a>
        </div>

        <p className="text-xs leading-relaxed opacity-80">
          {token.description}
        </p>
      </motion.div>
    </div>
  );
}
