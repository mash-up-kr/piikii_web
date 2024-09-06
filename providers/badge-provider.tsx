"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
import { cloneDeep } from "lodash-es";
import Image from "next/image";

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
  const [nextId, setNextId] = useState(1);
  const [badgeList, setBadgeList] = useState<BadgeMapType>(
    BADGE_LIST_INITIAL_VALUE
  );

  const list = useMemo(() => {
    return Array.from(badgeList.values())
      .flatMap((item) => item)
      .sort((a, b) => {
        if (typeof a.id === "number" && typeof b.id === "number") {
          return a.id - b.id;
        } else return 0;
      });
  }, [badgeList]);

  const updatedLabelList = useCallback(
    (array: BadgeType[], condition: boolean) => {
      const updatedList = array.map((item, index) => {
        const itemLabel = item.label as string;
        const name = itemLabel.split(/차|[0-9]/)[0];
        return {
          ...item,
          label: `${name}${condition ? ` ${index + 1}차` : ""}`,
        };
      });
      return updatedList;
    },
    []
  );

  const getBadgeData = useCallback(
    (id: number, item: BadgeType, count: number) => {
      const { icon, label, type, iconImage } = item;
      return {
        id,
        icon,
        type,
        label: `${label}${count !== 0 ? ` ${count + 1}차` : ""}`,
        iconImage: (
          <Image
            src={`/png/${type}_16.png`}
            width={16}
            height={16}
            alt={`${type}_16.png`}
          />
        ),
      };
    },
    []
  );

  const getMapValue = useCallback(
    (type?: string) => {
      const mapType = type as BadgeMapKeyType;
      const cloneList = cloneDeep(badgeList);
      const mapValue = cloneList.get(mapType);
      return {
        cloneList,
        mapValue,
        mapType,
      };
    },
    [badgeList]
  );

  const addBadge = useCallback(
    (item: BadgeType) => {
      if (Array.from(badgeList.values()).flat().length >= 5) {
        return;
      }
      const { type } = item;
      const { mapValue, cloneList, mapType } = getMapValue(type);

      if (mapValue) {
        const updatedList = updatedLabelList(mapValue, mapValue.length !== 0);
        const data = getBadgeData(nextId, item, updatedList?.length);
        cloneList.set(mapType, [...updatedList, data]);
      }

      setBadgeList(cloneList);
      setNextId(nextId + 1);
    },
    [badgeList, getBadgeData, getMapValue, nextId, updatedLabelList]
  );

  const removeBadge = useCallback(
    (item: BadgeType) => {
      const { type, id } = item;
      const { mapValue, cloneList, mapType } = getMapValue(type);

      if (mapValue) {
        const filteredList = mapValue.filter((v) => v.id !== id);
        const updatedList = updatedLabelList(
          filteredList,
          filteredList.length !== 1
        );
        cloneList.set(mapType, updatedList);
        setBadgeList(cloneList);
      }
    },
    [getMapValue, updatedLabelList]
  );

  const resetBadges = () => {
    setBadgeList(BADGE_LIST_INITIAL_VALUE);
    setNextId(1);
  };

  const value = useMemo(
    () => ({
      badgeList,
      nextId,
      list,
      addBadge,
      removeBadge,
      resetBadges,
    }),
    [addBadge, badgeList, list, nextId, removeBadge]
  );

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
