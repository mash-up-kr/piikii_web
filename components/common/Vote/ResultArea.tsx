"use client";

import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import CardWithImage from "@/components/common/Cards/CardWithImage";
import Image from "next/image";
import react from "react";
import { VoteAreaProps } from "@/model";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col w-[335px] mx-[20px] gap-y-[26px] pb-[80px]">
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
              className={`relative flex flex-row rounded-[12px] ${
                index === 0 ? "bg-[#FFF7F2]" : "bg-[#F9FAFB]"
              } w-[335px] h-[64px] items-center justify-between p-[20px]`}
            >
              <div className="relative z-10 flex flex-row items-center justify-start gap-x-[8px]">
                <span className="w-[20px] h-[20px] items-center bg-black text-[12px] font-semibold text-white flex justify-center rounded-[64px]">
                  {index + 1}
                </span>
                <span className="text-bold-16 text-secondary-700">
                  {placeInfo.name}
                </span>{" "}
                <span className="flex w-[21px] items-center h-[21px] text-[14px] opacity-[0.5] text-[#363A3C]">
                  {placeInfo.countOfAgree}명
                </span>
              </div>

              <button
                onClick={() => handleArrowClick(index)}
                className="relative z-10"
              >
                <Image
                  src={"/png/ic_arrow_down_16.png"}
                  width={16}
                  height={16}
                  alt="arrow"
                  className="mr-[4px]"
                />
              </button>

              {/* Fill Rect based on vote count */}
              <div
                className={cn(
                  "absolute left-0 top-0 h-[64px] rounded-[12px] w-[20px] z-5",
                  index === 0 ? "bg-primary-200" : "bg-neutral-300"
                )}
                style={{
                  width: `${Math.min(
                    100,
                    (placeInfo.countOfAgree / placeInfo.countOfVote) * 100
                  )}%`,
                }}
              />
            </div>
            {expandedCards.includes(index) && (
              <CardWithImage
                origin={placeInfo.origin}
                info={[
                  { label: "주소", value: placeInfo.address ?? "-" },
                  { label: "영업시간", value: placeInfo.openingHours ?? "-" },
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
