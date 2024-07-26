"use client";
import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import CardWithImage from "@/components/common/Cards/CardWithImage";
import Image from "next/image";
import { flattenColumns } from "@/lib/utils";
import { useState } from "react";

interface EditOptionAreaProps {
  initialColumns: ColumnsType;
  placesInfo: Array<{
    place: string;
    link: string;
    rating: string;
    reviewCount: number;
    images: string[];
  }>;
}
const ResultArea = ({ initialColumns, placesInfo }: EditOptionAreaProps) => {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  const handleArrowClick = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col w-[335px] h-[631px] mx-[20px] gap-y-[26px]">
      <div className="flex flex-row w-[252px] h-[37px] gap-x-[8px]">
        {flattenColumns(initialColumns).map((item) => (
          <CategoryChip
            key={item.globalIndex}
            title={item.title}
            selected={selectedChip === item.globalIndex}
            onClick={() => handleChipClick(item.globalIndex)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-[12px]">
        {placesInfo.map((placeInfo, index) => (
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
                <span>{placeInfo.place}</span>{" "}
                <span className="flex w-[21px] items-center h-[21px] text-[14px] opacity-[0.5] text-[#363A3C]">
                  6명
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
                place={placeInfo.place}
                link={placeInfo.link}
                rating={placeInfo.rating}
                reviewCount={placeInfo.reviewCount}
                images={placeInfo.images || []}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultArea;
