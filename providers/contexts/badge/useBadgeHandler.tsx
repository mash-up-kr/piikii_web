import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { cloneDeep } from "lodash-es";
import useBadgeState, { BadgeMapKeyType, BadgeType } from "./useBadgeState";

const useBadgeHandler = () => {
  const {
    BADGE_LIST_INITIAL_VALUE,
    nextId,
    badgeList,
    setNextId,
    setBadgeList,
  } = useBadgeState();

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
    [
      badgeList,
      getBadgeData,
      getMapValue,
      nextId,
      setBadgeList,
      setNextId,
      updatedLabelList,
    ]
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
    [getMapValue, setBadgeList, updatedLabelList]
  );

  const resetBadges = useCallback(() => {
    setBadgeList(BADGE_LIST_INITIAL_VALUE);
    setNextId(1);
  }, [BADGE_LIST_INITIAL_VALUE, setBadgeList, setNextId]);

  const value = useMemo(
    () => ({
      badgeList,
      nextId,
      list,
      addBadge,
      removeBadge,
      resetBadges,
    }),
    [addBadge, badgeList, list, nextId, removeBadge, resetBadges]
  );

  return {
    value,
  };
};

export default useBadgeHandler;
