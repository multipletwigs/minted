"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CoinCard } from "@/components/coin-card";
import { CoinInfo } from "@/components/coin-info";
import { cardAnimation } from "@/lib/tokens";
import { stackedCardConfigs } from "@/lib/card-configs";
import { useSelection } from "@/contexts/selection-context";

export function CoinPreview() {
  const { selected, clearSelection } = useSelection();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [selected?.address]);

  const handleClick = () => {
    // Don't toggle if user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    setExpanded((prev) => !prev);
  };

  const cardWidth = 288; // md size
  const totalCards = stackedCardConfigs.length + 1;
  const gap = 16;
  // Offset to center the group when expanded
  const centerOffset = -((totalCards - 1) * (cardWidth + gap)) / 2;

  return (
    <div
      onClick={handleClick}
      className="flex-1 flex items-center justify-center py-8 cursor-pointer"
    >
      {selected ? (
        <motion.div
          key={selected.address}
          className="relative"
          initial="rest"
          whileHover={expanded ? undefined : "hover"}
          animate={expanded ? "expanded" : "rest"}
        >
          {/* Stacked cards */}
          {stackedCardConfigs.map((card, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 origin-center"
              variants={{
                rest: {
                  x: 0,
                  scale: 0,
                  transitionEnd: { zIndex: -index - 1 },
                },
                hover: {
                  x: card.x - 20,
                  scale: 0.95 - index * 0.05,
                  transitionEnd: { zIndex: -index - 1 },
                },
                expanded: {
                  x: centerOffset + (index + 1) * (cardWidth + gap),
                  scale: 1,
                  transitionEnd: { zIndex: index + 1 },
                },
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <CoinCard
                size="md"
                className="shadow-lg bg-foreground text-background"
              >
                {expanded && card.component({ address: selected.address, config: card })}
              </CoinCard>
            </motion.div>
          ))}

          {/* Main card */}
          <motion.div
            layoutId={`card-${selected.address}`}
            variants={{
              rest: { x: 0 },
              hover: { x: -20 },
              expanded: { x: centerOffset },
            }}
            transition={cardAnimation.transition}
          >
            <CoinCard
              size="md"
              className="shadow-2xl"
              style={{ backgroundColor: selected.color }}
              ditherConfig={{
                shape: selected.dither.shape,
                type: selected.dither.type,
                ratio: 0.3,
              }}
            >
              <CoinInfo token={selected} />
            </CoinCard>
          </motion.div>
        </motion.div>
      ) : (
        <motion.p
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-muted-foreground"
        >
          Select a coin below
        </motion.p>
      )}
    </div>
  );

}
