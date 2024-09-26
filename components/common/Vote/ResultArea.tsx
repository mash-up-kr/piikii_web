"use client";

import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import CardWithImage from "@/components/common/Cards/CardWithImage";
import Image from "next/image";
import react from "react";
import { VoteAreaProps } from "@/model";
import { cn } from "@/lib/utils";
import { ImgBgType, VoteImagePolicy } from "@/app/vote/policy/VoteImagePolicy";

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

  const countOfTotalVote = selectedSchedule.places.reduce((acc, cur) => {
    return Math.max(acc, cur.countOfVote);
  }, 0);

  return (
    <div className="flex flex-col w-full max-w-[430px] px-[20px] gap-y-[26px] pb-[80px]">
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
        {selectedSchedule.places.map((placeInfo, index) => {
          const thumbnailImages =
            placeInfo.thumbnailLinks.contents.map((url) => {
              if (VoteImagePolicy.isDefaultImageUrl(url)) {
                return VoteImagePolicy.getPublicDefaultImgUrl(
                  url,
                  ImgBgType.GRAY
                );
              }

              return url;
            }) || [];

          return (
            <div key={index}>
              <div
                onClick={() => handleArrowClick(index)}
                className={cn(
                  `relative flex flex-row rounded-[12px] w-full max-w-[430px] h-[64px] items-center justify-between p-[20px] cursor-pointer`,
                  index === 0 ? "bg-primary-50" : "bg-neutral-100"
                )}
              >
                <div className="relative z-10 flex flex-row items-center justify-start gap-x-[8px]">
                  <span
                    className={cn(
                      "w-[20px] h-[20px] items-center text-semibold-12 flex justify-center rounded-[64px]",
                      index === 0
                        ? "text-neutral-0 bg-neutral-900"
                        : "bg-neutral-500 text-neutral-0"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-bold-16 text-secondary-700">
                    {placeInfo.name}
                  </span>{" "}
                  <span className="flex min-w-[21px] items-center h-[21px] text-[14px] opacity-[0.5] text-[#363A3C]">
                    {placeInfo.countOfAgree}명
                  </span>
                </div>

                <button className="relative z-10">
                  <Image
                    src={"/png/ic_arrow_down_16.png"}
                    width={16}
                    height={16}
                    alt="arrow"
                    className={cn(
                      "mr-[4px]",
                      expandedCards.includes(index) && "rotate-180"
                    )}
                  />
                </button>

                {/* Fill Rect based on vote count */}
                <div
                  className={cn(
                    "absolute left-0 top-0 h-[64px] rounded-[12px] z-5",
                    index === 0 ? "bg-primary-200" : "bg-neutral-300"
                  )}
                  style={{
                    width: `${Math.min(
                      100,
                      (placeInfo.countOfAgree / countOfTotalVote) * 100
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
                  rating={Number(placeInfo.starGrade.toFixed(2)) ?? "0"}
                  images={thumbnailImages || []}
                  cardClassName={cn(
                    "mt-[8px]",
                    index !== 0 && "!bg-neutral-100"
                  )}
                  cardButtonClassName={cn(index !== 0 && "!bg-neutral-200")}
                  cardDividerClassName={cn(
                    index === 0 ? "!border-primary-100" : "!border-neutral-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultArea;
