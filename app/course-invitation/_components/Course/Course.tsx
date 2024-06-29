"use client";

import React from "react";
import CardWithIconList from "@/components/common/Cards/CardWithIconList";
import BasisSection from "@/components/common/Layout/BasisSection";
import { Button } from "@/components/common/Button/Button";
import { IconInfo } from "@/model";
import CourseBadge from "./_components/CourseBadge";
import useCourse from "./_hooks/useCourse";

const MENU_LIST: IconInfo[] = [
  { icon: "🍔", label: "음식", type: "food" },
  { icon: "🥨", label: "디저트", type: "desert" },
  { icon: "🍺", label: "술", type: "alchol" },
  { icon: "🕹️", label: "놀거리", type: "play" },
];

const Course = () => {
  const { badgeList, BADGE_INIT_DATA, onClickCard } = useCourse();
  return (
    <BasisSection className="flex flex-col items-center">
      <h3 className="py-[32px] text-bold-22">어떤 순서로 가실 건가요?</h3>

      {badgeList.length === 0 && (
        <CourseBadge item={{ ...BADGE_INIT_DATA }} onDelete={() => null} />
      )}

      {badgeList.length > 0 &&
        badgeList.map((item, index) => {
          return (
            <CourseBadge
              key={`badge-list-item-${index}`}
              item={item}
              onDelete={() => null}
            />
          );
        })}
      <CardWithIconList
        iconInfo={MENU_LIST}
        onClickCard={onClickCard}
        className="pt-[32px]"
      />

      <div className="absolute w-full bottom-0 bg-white py-[10px] px-[20px]">
        <Button className="h-[56px]" disabled={badgeList.length === 0}>
          정했어요
        </Button>
      </div>
    </BasisSection>
  );
};

export default Course;
