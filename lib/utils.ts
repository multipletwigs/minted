import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TOKEN_PROGRAM_ADDRESS, TOKEN_2022_PROGRAM_ADDRESS } from "@solana/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, startChars = 4, endChars = 4): string {
  if (address.length <= startChars + endChars + 3) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function getTokenStandard(owner: string | null): string {
  if (owner === TOKEN_PROGRAM_ADDRESS) return "SPL Token";
  if (owner === TOKEN_2022_PROGRAM_ADDRESS) return "Token Extensions";
  return owner ? truncateAddress(owner) : "Unknown";
}

export function getSolscanUrl(address: string, cluster: "devnet" | "mainnet" = "devnet"): string {
  const base = `https://solscan.io/account/${address}`;
  return cluster === "devnet" ? `${base}?cluster=devnet` : base;
}
