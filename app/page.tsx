"use client";

import { LayoutGroup } from "motion/react";
import { CoinPreview } from "@/components/coin-preview";
import { CoinSelector } from "@/components/coin-selector";
import { Heading } from "@/components/heading";

export default function Page() {
  return (
    <LayoutGroup>
      <main className="min-h-screen max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex flex-col">
        <Heading />
        <div className="flex flex-1 flex-col gap-4">
          <CoinPreview />
          <CoinSelector />
        </div>
      </main>
    </LayoutGroup>
  );
}
