import { IconInfo } from "@/model";
import React, { useState } from "react";

export type BadgeType = Pick<IconInfo, "label"> & { id: number };

export const BADGE_INIT_DATA: BadgeType = { id: 0, label: "?" };

const useCourse = () => {
  const [badgeList, setBadgeList] = useState([]);

  const onClickCard = (item: IconInfo) => {
    console.log(item);
  };

  return { badgeList, BADGE_INIT_DATA, onClickCard };
};

export default useCourse;
