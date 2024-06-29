"use client";

import Step from "@/components/common/Step";
import MotionCardContainer from "./components/MotionCardContainer";
import Title from "@/components/common/Title";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import Image from "next/image";
import { Z_INDEX } from "@/lib/constants";

const TEMP_DATA = [
  {
    id: 1,
    stageName: "1차 식당",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    stageName: "2차 술집",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    stageName: "3차 카페",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    stageName: "4차 멍멍",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    stageName: "5차 냥냥",
    image: "https://via.placeholder.com/300",
  },
];

export default function Page() {
  const [curStageIndex, setCurStageIndex] = useState<number>(0);

  return (
    <div className="h-dvh bg-primary-100 pt-[8px] flex flex-col justify-center">
      {/* Header */}
      <div className="relative px-[20px]" style={{ zIndex: Z_INDEX.HEADER }}>
        {/* Step */}
        <Step curStep={curStageIndex} totalSteps={TEMP_DATA.length} />

        {/* Title */}
        <div className="h-[77px] flex items-start mt-[31px]">
          <Title
            title={
              <span className="text-neutral-700">
                <span className="text-primary-700">1차 식당</span>을
                투표해주세요
              </span>
            }
            titleClassName="text-black-22"
            subtitle="카드를 좌우로 밀어보세요"
            subtitleClassName="text-neutral-600"
          />
        </div>
      </div>

      {/* Card Section */}
      {/* - 카드는 현 차수 기준으로 로드 후 보류가 있으면 그 다음 보류 처리 */}
      <div className="flex justify-center items-center w-full flex-col">
        <MotionCardContainer
          cardList={[1, 2, 3, 4, 5]}
          onUpdateCardList={function (cardList: any[]): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
