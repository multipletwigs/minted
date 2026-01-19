"use client";

import { motion } from "motion/react";
import { CoinCard } from "@/components/coin-card";
import { getTokens, cardAnimation } from "@/lib/tokens";
import { truncateAddress } from "@/lib/utils";
import { useSelection } from "@/contexts/selection-context";

const tokens = getTokens();

export function CoinSelector() {
  const { selected, setSelected } = useSelection();
  const visibleTokens = tokens.filter((t) => t.address !== selected?.address);

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative h-48"
        style={{ width: `${visibleTokens.length * 120 + 48}px` }}
      >
        {visibleTokens.map((token, i) => (
          <motion.div
            key={token.address}
            layoutId={`card-${token.address}`}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 -m-4 cursor-pointer"
            style={{ zIndex: i }}
            animate={{ rotate: token.rotation, x: i * 120 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={cardAnimation.transition}
            onClick={() => setSelected(token)}
          >
            <CoinCard
              size="xs"
              className="shadow-lg"
              style={{ backgroundColor: token.color }}
              ditherConfig={{
                shape: token.dither.shape,
                type: token.dither.type,
                ratio: 2/3,
              }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-bold text-white">${token.symbol}</span>
                <span className="text-[10px] text-white/70">{truncateAddress(token.address)}</span>
              </div>
            </CoinCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
