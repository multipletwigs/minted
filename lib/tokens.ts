/**
 * Political meme coin token addresses for Framework Kit integration
 */

import type { DitheringShape, DitheringType } from "@paper-design/shaders";

export type TokenInfo = {
  symbol: string;
  name: string;
  description: string;
  address: string;
  color: string;
  rotation: number;
  dither: {
    shape: DitheringShape;
    type: DitheringType;
  };
};

const localTokens: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Wrapped SOL",
    description: "Native Solana token wrapped as an SPL token. Allows SOL to be used in DeFi protocols that require SPL token standard.",
    address: "So11111111111111111111111111111111111111112",
    color: "#7C927B",
    rotation: -12,
    dither: { shape: "simplex", type: "8x8" },
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    description: "Circle's USD-backed stablecoin. Each USDC is backed 1:1 by US dollars held in regulated financial institutions.",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    color: "#B8898A",
    rotation: 8,
    dither: { shape: "warp", type: "4x4" },
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    description: "Tether's USD-pegged stablecoin. The most widely traded stablecoin by volume across all blockchains.",
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    color: "#7A8A99",
    rotation: -5,
    dither: { shape: "swirl", type: "8x8" },
  },
  {
    symbol: "ETH",
    name: "Wrapped Ether",
    description: "Ethereum bridged to Solana via Wormhole. Represents ETH from Ethereum mainnet locked in a bridge contract.",
    address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    color: "#B8937A",
    rotation: 15,
    dither: { shape: "ripple", type: "4x4" },
  },
  {
    symbol: "mSOL",
    name: "Marinade Staked SOL",
    description: "Liquid staking token from Marinade Finance. Stake SOL and receive mSOL that earns staking rewards while remaining liquid.",
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    color: "#9088A6",
    rotation: -9,
    dither: { shape: "wave", type: "2x2" },
  },
];

const prodTokens: TokenInfo[] = [
  {
    symbol: "TRUMP",
    name: "Official Trump",
    description: "Official memecoin launched by Donald Trump. One of the first major political figure tokens on Solana.",
    address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
    color: "#7C927B",
    rotation: -12,
    dither: { shape: "simplex", type: "8x8" },
  },
  {
    symbol: "MELANIA",
    name: "Melania Meme",
    description: "Memecoin associated with Melania Trump. Launched shortly after the TRUMP token gained traction.",
    address: "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P",
    color: "#B8898A",
    rotation: 8,
    dither: { shape: "warp", type: "4x4" },
  },
  {
    symbol: "LIBRA",
    name: "Libra",
    description: "Controversial token promoted by Argentine President Milei. Lost most of its value shortly after launch amid rug pull accusations.",
    address: "Bo9jh3wsmcC2AjakLWzNmKJ3SgtZmXEcSaW7L2FAvUsU",
    color: "#7A8A99",
    rotation: -5,
    dither: { shape: "swirl", type: "8x8" },
  },
  {
    symbol: "PNUT",
    name: "Peanut the Squirrel",
    description: "Memecoin honoring Peanut, a rescued squirrel euthanized by NY authorities in 2024. Went viral after Elon Musk tweeted about it, reaching a $1B market cap.",
    address: "2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump",
    color: "#B8937A",
    rotation: 15,
    dither: { shape: "ripple", type: "4x4" },
  },
  {
    symbol: "CUBA",
    name: "Official Cuba Coin",
    description: "Token launched from a hacked Cuban government X account in January 2025. Part of a $30M rug pull scheme that spawned multiple copycat tokens.",
    address: "27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump",
    color: "#9088A6",
    rotation: -9,
    dither: { shape: "wave", type: "2x2" },
  },
];

const isDev = process.env.NODE_ENV === "development";

const tokens = isDev ? localTokens : prodTokens;

export const getTokens = (): TokenInfo[] => tokens;

export const cardAnimation = {
  transition: {
    type: "spring" as const,
    stiffness: 120,
    damping: 17,
  },
};
