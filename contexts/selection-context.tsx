"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { TokenInfo } from "@/lib/tokens";

interface SelectionContextValue {
  selected: TokenInfo | null;
  setSelected: (token: TokenInfo | null) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<TokenInfo | null>(null);

  const clearSelection = () => setSelected(null);

  return (
    <SelectionContext.Provider value={{ selected, setSelected, clearSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
