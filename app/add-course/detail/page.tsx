"use client";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import { CategoryChip } from "../_components/CategoryChip";
import { flattenColumns } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { InputWithLabel } from "../_components/InputWithLabel";

// 사용자가 설정한 데이터라고 가정
const initialColumns: ColumnsType = {
  course: {
    id: "course",
    list: {
      food: [{ globalIndex: 0, title: "음식점", type: "food", icon: "🍔" }],
      dessert: [{ globalIndex: 1, title: "카페", type: "dessert", icon: "🥨" }],
      beer: [
        { globalIndex: 2, title: "술 1차", type: "dessert", icon: "🥨" },
        { globalIndex: 3, title: "술 2차", type: "dessert", icon: "🥨" },
      ],
      play: [{ globalIndex: 4, title: "놀거리", type: "play", icon: "🥨" }],
    },
  },
};

const AddDetailPage = () => {
  const router = useRouter();
  const [selectedChip, setSelectedChip] = useState<number | null>(null);

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  return (
    <div className="flex flex-col gap-y-[56px]">
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={() => router.back()}
          >
            <Image
              src="/png/ic_arrow_left_24.png"
              alt="ic_arrow_left_24.png"
              width={24}
              height={24}
            />
            <p className="text-semibold-15 text-neutral-700">장소 추가하기</p>
          </div>
        }
      />
      <div className="flex flex-col w-[335px] mt-[56px] mx-[20px] gap-y-[32px]">
        <div className="flex flex-col w-[252px] h-[98px]">
          <div className="flex flex-row items-end w-[90px] h-[24px] gap-x-[6px]">
            <p className="w-[59px] font-bold text-[#292E31] text-[16px]">
              장소 선택
            </p>
            <p className="w-[25px] font-bold text-[#FF601C] text-[14px]">
              필수
            </p>
          </div>
          <div className="w-[120px] h-[21px] font-medium text-[14px] text-[#23272F] opacity-[0.5] mb-[12px]">
            여러 개 선택 가능해요
          </div>
          <div className="flex flex-row w-[252px] h-[98px] gap-x-[8px]">
            {flattenColumns(initialColumns).map((item) => (
              <CategoryChip
                key={item.globalIndex}
                title={item.title}
                selected={selectedChip === item.globalIndex}
                onClick={() => handleChipClick(item.globalIndex)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full h-[184px] gap-y-[12px]">
          <div className="flex flex-row w-[90px] h-[24px] gap-x-[6px]">
            <p className="w-[59px] font-bold text-[#292E31] text-[16px]">
              장소 이름
            </p>
            <p className="w-[25px] font-bold text-[#FF601C] text-[14px]">
              필수
            </p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <InputWithLabel type="text" placeholder="상호명을 적어주세요" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <Input className="w-[80px] h-[80px]" id="picture" type="file" />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-[12px]">
            <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
              링크
            </p>
            <InputWithLabel
              type="link"
              placeholder="링크를 붙여주세요"
              iconSrc="/svg/ic_link.svg"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-[12px]">
            <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
              영업정보
            </p>
            <InputWithLabel
              type="link"
              placeholder="영업 시간을 남겨주세요"
              iconSrc="/svg/ic_clock_mono.svg"
            />
            <InputWithLabel
              type="link"
              placeholder="주소를 남겨주세요"
              iconSrc="/svg/ic_pin_location_mono.svg"
            />
            <InputWithLabel
              type="link"
              placeholder="전화번호를 남겨주세요"
              iconSrc="/svg/ic_call_mono.svg"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <InputWithLabel
              type="link"
              placeholder="일행에게 메모를 남겨주세요"
              iconSrc="/svg/ic_memo_mono.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetailPage;
