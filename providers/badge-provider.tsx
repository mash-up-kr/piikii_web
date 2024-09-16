"use client";

import { createContext, useContext, ReactNode } from "react";
import { BadgeMapType, BadgeType } from "./contexts/badge/useBadgeState";
import useBadgeHandler from "./contexts/badge/useBadgeHandler";

interface BadgeContextType {
  badgeList: BadgeMapType;
  nextId: number;
  list: BadgeType[];
  addBadge: (item: BadgeType) => void;
  removeBadge: (item: BadgeType) => void;
  resetBadges: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export interface BadgeProviderProps {
  children: ReactNode;
}

export const BadgeProvider = ({ children }: BadgeProviderProps) => {
  const { value } = useBadgeHandler();

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
};

export const useBadgeContext = (): BadgeContextType => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadgeContext must be used within a BadgeProvider");
  }
  return context;
};
