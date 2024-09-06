"use client";

import React from "react";
import CardWithIconList from "@/components/common/Cards/CardWithIconList";
import BasisSection from "@/components/common/Layout/BasisSection";
import { Button } from "@/components/common/Button/Button";
import { IconInfo } from "@/model";
import CourseBadge from "./_components/CourseBadge";
import useCourse from "./_hooks/useCourse";
import { StepType } from "../_hooks/useCourseInvitation";
import Image from "next/image";

const MENU_LIST: IconInfo[] = [
  {
    icon: "🍔",
    label: "음식",
    type: "food",
    iconImage: (
      <Image src="/png/food_34.png" width={34} height={34} alt="food_34.png" />
    ),
  },
  {
    icon: "🥨",
    label: "디저트",
    type: "dessert",
    iconImage: (
      <Image
        src="/png/dessert_34.png"
        width={34}
        height={34}
        alt="dessert_34.png"
      />
    ),
  },
  {
    icon: "🍺",
    label: "술",
    type: "beer",
    iconImage: (
      <Image
        src="/png/beer_34.png"
        width={34}
        height={34}
        alt="beer_34.png"
      />
    ),
  },
  {
    icon: "🕹️",
    label: "놀거리",
    type: "play",
    iconImage: (
      <Image
        src="/png/play_34.png"
        width={34}
        height={34}
        alt="play_34.png"
      />
    ),
  },
];

export interface CourseProps {
  handleStep: (step: StepType) => void;
}

const Course = ({ handleStep }: CourseProps) => {
  const {
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

      {isAllCategoriesEmpty ? (
        <CourseBadge item={{ ...BADGE_INIT_DATA }} onDelete={() => null} />
      ) : (
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
        cardClassName="rounded-[16px]"
      />

      <div className="w-full bottom-0 bg-white py-[10px] px-[20px] mt-[134px]">
        <Button
          className="h-[56px] rounded-[14px]"
          variant={isAllCategoriesEmpty ? "disabled" : "default"}
          onClick={handleNext}
        >
          정했어요
        </Button>
      </div>
    </BasisSection>
  );
};

export default Course;
