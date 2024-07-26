"use client";
import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import { CardWithSelectedOption } from "@/components/common/Cards/CardWithSelectedOption";
import { flattenColumns } from "@/lib/utils";
import { useRouter } from "next/navigation";
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
const EditOptionArea = ({
  initialColumns,
  placesInfo,
}: EditOptionAreaProps) => {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
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
          <CardWithSelectedOption
            key={index}
            selected={selectedCard === index}
            place={placeInfo.place}
            link={placeInfo.link}
            rating={placeInfo.rating}
            reviewCount={placeInfo.reviewCount}
            images={placeInfo.images || []}
            onButtonClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EditOptionArea;
