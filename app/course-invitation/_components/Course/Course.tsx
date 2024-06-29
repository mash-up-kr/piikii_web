"use client";

import CardWithIconList from "@/components/common/Cards/CardWithIconList";
import BasisSection from "@/components/common/Layout/BasisSection";
import { IconInfo } from "@/model";
import React from "react";

const iconInfo: IconInfo[] = [
  { icon: "🍔", label: "음식" },
  { icon: "🥨", label: "디저트" },
  { icon: "🍺", label: "술" },
  { icon: "🕹️", label: "놀거리" },
];

const Course = () => {
  return (
    <BasisSection className="flex flex-col items-center">
      <h3 className="py-[32px] text-bold-22">어떤 순서로 가실 건가요?</h3>
      <CardWithIconList iconInfo={iconInfo} />
    </BasisSection>
  );
};

export default Course;
