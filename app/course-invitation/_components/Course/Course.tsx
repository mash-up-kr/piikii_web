"use client";

import React from "react";
import CardWithIconList from "@/components/common/Cards/CardWithIconList";
import BasisSection from "@/components/common/Layout/BasisSection";
import { Button } from "@/components/common/Button/Button";
import { IconInfo } from "@/model";
import CourseBadge from "./_components/CourseBadge";
import useCourse from "./_hooks/useCourse";
import { StepType } from "../_hooks/useCourseInvitation";

const MENU_LIST: IconInfo[] = [
  { icon: "🍔", label: "음식", type: "food" },
  { icon: "🥨", label: "디저트", type: "dessert" },
  { icon: "🍺", label: "술", type: "beer" },
  { icon: "🕹️", label: "놀거리", type: "play" },
];

export interface CourseProps {
  handleStep: (step: StepType) => void;
}

const Course = ({ handleStep }: CourseProps) => {
  const {
    badgeList,
    BADGE_INIT_DATA,
    list,
    addBadge,
    removeBadge,
    handleNext,
    isAllCategoriesEmpty,
  } = useCourse({ handleStep });

  return (
    <BasisSection className="flex flex-col items-center">
      <h3 className="py-[32px] text-bold-22">어떤 순서로 가실 건가요?</h3>

      {isAllCategoriesEmpty() && (
        <CourseBadge item={{ ...BADGE_INIT_DATA }} onDelete={() => null} />
      )}

      {!isAllCategoriesEmpty() && (
        <div className="px-[20px] justify-center flex gap-[8px] flex-wrap">
          {list.map((item, index) => {
            return (
              <CourseBadge
                key={`badge-list-item-${index}`}
                item={item}
                onDelete={() => removeBadge(item)}
              />
            );
          })}
        </div>
      )}

      <CardWithIconList
        iconInfo={MENU_LIST}
        onClickCard={addBadge}
        className="pt-[32px]"
      />

      <div className="absolute w-full bottom-0 bg-white py-[10px] px-[20px]">
        <Button
          className="h-[56px]"
          disabled={isAllCategoriesEmpty()}
          onClick={handleNext}
        >
          정했어요
        </Button>
      </div>
    </BasisSection>
  );
};

export default Course;
