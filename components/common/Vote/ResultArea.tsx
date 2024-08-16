"use client";

import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import CardWithImage from "@/components/common/Cards/CardWithImage";
import Image from "next/image";
import react from "react";
import { VoteAreaProps } from "@/model";

const ResultArea = ({
  schedules,
  selectedSchedule,
  onClickSchedule,
}: VoteAreaProps) => {
  const [expandedCards, setExpandedCards] = react.useState<number[]>([]);

  const handleArrowClick = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col w-[335px] h-[631px] mx-[20px] gap-y-[26px]">
      <div className="flex flex-row w-[252px] h-[37px] gap-x-[8px]">
        {schedules.map((item) => (
          <CategoryChip
            key={item.scheduleId}
            title={item.scheduleName}
            selected={selectedSchedule.scheduleId === item.scheduleId}
            onClick={() => onClickSchedule(item.scheduleId)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-[12px]">
        {selectedSchedule.places.map((placeInfo, index) => (
          <div key={index}>
            <div
              className={`flex flex-row rounded-[12px] ${
                index === 0 ? "bg-[#FFF7F2]" : "bg-[#F9FAFB]"
              } w-[335px] h-[64px] items-center justify-between p-[20px]`}
            >
              <div className="flex flex-row items-center justify-start gap-x-[8px]">
                <span className="w-[20px] h-[20px] items-center bg-black text-[12px] font-semibold text-white flex justify-center rounded-[64px]">
                  {index + 1}
                </span>
                <span>{placeInfo.name}</span>{" "}
                <span className="flex w-[21px] items-center h-[21px] text-[14px] opacity-[0.5] text-[#363A3C]">
                  {placeInfo.countOfAgree}
                </span>
              </div>
              <button onClick={() => handleArrowClick(index)}>
                <Image
                  src={"/png/ic_arrow_down_16.png"}
                  width={16}
                  height={16}
                  alt="arrow"
                  className="mr-[4px]"
                />
              </button>
            </div>
            {expandedCards.includes(index) && (
              <CardWithImage
                origin={placeInfo.origin}
                info={[
                  { label: "음식", value: "한식" },
                  { label: "가격대", value: "만원 미만" },
                  { label: "메모", value: placeInfo.memo ?? "-" },
                ]}
                place={placeInfo.name}
                link={placeInfo.url}
                rating={placeInfo.starGrade.toString() ?? "0"}
                images={placeInfo.thumbnailLinks.contents || []}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultArea;
