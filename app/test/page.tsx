"use client";
import CardWithImage, {
  CardWithDislike,
  CardWithLike,
} from "@/components/common/Cards/CardWithImage";
import { Size } from "@/model";
import React from "react";

const images = ["/png/food.png", "/png/food.png", "/png/food.png"];
const info = [
  { label: "영업시간", value: "11:00 - 21:00" },
  { label: "브레이크 타임", value: "15:00 - 17:00" },
  { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
];

const CardComponentPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <CardWithImage
        place={"돈카춘 노원점"}
        link={"/"}
        rating={"4.5"}
        numberOfReviews={30}
        images={images}
        info={info}
      />
      <div className="flex flex-row gap-x-5">
        <CardWithLike size={Size.small} />
        <CardWithDislike size={Size.large} />
      </div>
    </div>
  );
};

export default CardComponentPage;
