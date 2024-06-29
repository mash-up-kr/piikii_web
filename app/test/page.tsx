"use client";
import { CardForCopiedContent } from "@/components/common/Cards/CardForCopiedContent";
import CardWithImage, {
  CardWithDislike,
  CardWithLike,
} from "@/components/common/Cards/CardWithImage";
import { IconInfo, Size } from "@/model";
import PendingCard, {
  PendingCardList,
} from "@/components/common/Cards/PendingCard";
import React from "react";
import { CardWithImageSmall } from "@/components/common/Cards/CardWithImageSmall";
import { number } from "yargs";

const images = ["/png/food.png", "/png/food.png", "/png/food.png"];
const info = [
  { label: "영업시간", value: "11:00 - 21:00" },
  { label: "브레이크 타임", value: "15:00 - 17:00" },
  { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
];
const handleButtonClick = () => {
  return alert("click!");
};
const cardData = [
  { place: "딤딤섬 삼성점", images: ["/png/food.png"] },
  { place: "딤딤섬 목동점", images: ["/png/food.png"] },
];

const CardComponentPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <CardWithImage
        place={"돈카춘 노원점"}
        link={"/"}
        rating={"4.5"}
        reviewCount={30}
        images={images}
        info={info}
      />
      <CardWithImageSmall
        place={"dghsajhgldhljghjdhdjdghjhlds"}
        link={"/"}
        rating={"4.1"}
        reviewCount={300}
        images={images}
        info={info}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default CardComponentPage;
