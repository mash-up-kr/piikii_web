"use client";
import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import { CardWithSelectedOption } from "@/components/common/Cards/CardWithSelectedOption";
import { flattenColumns } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const placesInfo = [
  {
    place: "옥소반 상암점",
    link: "abcd",
    rating: "4.01",
    reviewCount: 433,
    images: ["/png/food.png"],
  },
  {
    place: "스타벅스 강남점",
    link: "efgh",
    rating: "4.5",
    reviewCount: 1200,
    images: ["/png/food.png"],
  },
  {
    place: "맥도날드 홍대점",
    link: "ijkl",
    rating: "3.8",
    reviewCount: 530,
    images: ["/png/food.png"],
  },
  {
    place: "빕스 여의도점",
    link: "mnop",
    rating: "4.2",
    reviewCount: 870,
    images: ["/png/food.png"],
  },
  {
    place: "이디야 커피 신촌점",
    link: "qrst",
    rating: "4.0",
    reviewCount: 300,
    images: ["/png/food.png"],
  },
];

const EditOptionArea = () => {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
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
            place={placeInfo.place}
            link={placeInfo.link}
            rating={placeInfo.rating}
            reviewCount={placeInfo.reviewCount}
            images={placeInfo.images || []}
          />
        ))}
      </div>
    </div>
  );
};

export default EditOptionArea;
