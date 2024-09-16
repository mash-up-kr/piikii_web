import React, { useState } from "react";

export type BadgeInfoType = {
  icon?: string;
  label?: string;
  type?: string;
  id?: number;
  iconImage?: React.ReactNode;
};

export type BadgeType = BadgeInfoType;

export type BadgeMapKeyType = "food" | "dessert" | "beer" | "play";

export type BadgeMapType = Map<BadgeMapKeyType, BadgeType[]>;

const BADGE_LIST_INITIAL_VALUE: BadgeMapType = new Map([
  ["food", []],
  ["dessert", []],
  ["beer", []],
  ["play", []],
]);

const useBadgeState = () => {
  const [nextId, setNextId] = useState(1);
  const [badgeList, setBadgeList] = useState<BadgeMapType>(
    BADGE_LIST_INITIAL_VALUE
  );

  return {
    BADGE_LIST_INITIAL_VALUE,
    nextId,
    badgeList,
    setNextId,
    setBadgeList,
  };
};

export default useBadgeState;
