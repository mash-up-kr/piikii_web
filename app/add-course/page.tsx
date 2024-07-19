"use client";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import React, { useRef, useState, TouchEvent } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnsType } from "../edit-course/_components/DragAndDropArea";
import { CategoryChip } from "./_components/CategoryChip";
import { flattenColumns } from "@/lib/utils";

// 사용자가 설정한 데이터라고 가정
const initialColumns: ColumnsType = {
  course: {
    id: "course",
    list: {
      food: [
        { globalIndex: 0, title: "음식 1차", type: "food", icon: "🍔" },
        { globalIndex: 1, title: "음식 2차", type: "food", icon: "🍔" },
      ],
      dessert: [
        { globalIndex: 2, title: "디저트 3차", type: "dessert", icon: "🥨" },
      ],
      beer: [
        { globalIndex: 3, title: "술 1차", type: "dessert", icon: "🥨" },
        { globalIndex: 4, title: "술 2차", type: "dessert", icon: "🥨" },
      ],
      play: [],
    },
  },
};

const AddCoursePage = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (sliderRef.current) {
      if (touchStartX - touchEndX > 50) {
        sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
      } else if (touchStartX - touchEndX < -50) {
        sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer px-[20px] py-[11px] mb-[16px]">
        <p className="text-semibold-15 text-neutral-700">강남역으로 모여</p>
      </div>
      <div className="flex flex-col px-[20px] w-[335px] h-[148px] mt-[16px]">
        <div className="flex flex-row w-[224px] font-extrabold h-[31px] text-[22px] mb-[16px]">
          <p className="text-[#FF601C]">투표 후 코스</p>
          <p>를 추천받아요</p>
        </div>
        <div className="flex w-[335px] h-[56px] px-[20px] py-[12px] gap-x-[16px] bg-[#FFF7F2] border-2 border-[#FFF1EB] rounded-[32px] items-center">
          <p className="w-[251px] h-[24px] text-[#747B89]">
            네이버, 카카오 링크를 넣어주세요
          </p>{" "}
          <Image
            src={"/png/ic_arrow_left_circle_32.png"}
            alt="arrow"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-row mt-[8px] w-[335px] h-[37px] items-center py-[8px] pr-[12px]">
          <div className="flex flex-row items-center justify-start gap-x-[6px]">
            <Image
              src={"/png/ic_plus_circle_20.png"}
              alt="plus"
              width={20}
              height={20}
            />
            <p className="w-[52px] text-[14px] font-semibold text-[#B5B9C6]">
              직접 추가
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-[375px] h-[12px] bg-[#F9FAFB] mt-[16px] mb-[20px]" />
      <div className="flex flex-row justify-between items-center">
        <div
          className="flex flex-start pl-[20px] w-full h-[37px] items-center gap-x-[8px] overflow-x-scroll scrollbar-hide"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {flattenColumns(initialColumns).map((item) => (
            <CategoryChip key={item.globalIndex} title={item.title} />
          ))}
        </div>
        <div className="flex items-center justify-center w-[32px] h-[32px] mr-[20px] border-2 border-[#E7E8EB] rounded-[16px] bg-white">
          <Image
            src={"/png/ic_arrow_left_right_20.png"}
            alt="plus"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-full items-center justify-center mt-[64px]">
        <div className="flex flex-col items-center justify-center w-full h-[197px] gap-y-[12px]">
          <div className="flex w-[90px] h-[90px] rounded-[16px] bg-[#F0F1F5] items-center justify-center">
            <Image
              src={"/png/ic_picture_24.png"}
              alt="empty_picture"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col w-full items-center justify-center text-[14px] text-[#8B95A1]">
            <p className="flex w-full items-center justify-center">
              일행을 초대하고
            </p>
            <p className="flex w-full items-center justify-center">
              함께 장소를 추가하세요
            </p>
          </div>
          <Button className="w-[112px] h-[41px] hover:bg-transparent bg-transparent border-2 gap-x-[4px] rounded-[28px] border-[#FF601C] text-[#FF601C]">
            <Image src={"/svg/ic_wrap.svg"} alt="wrap" width={16} height={16} />
            <p>일행 초대</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
