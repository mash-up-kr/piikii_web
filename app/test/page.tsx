"use client";
import CardWithIcon, {
  CardWithIconList,
} from "@/components/common/Cards/CardWithIcon";
import CardWithImage, {
  CardWithDislike,
  CardWithLike,
} from "@/components/common/Cards/CardWithImage";
import { IconAndDesc, Size } from "@/model";
import React from "react";

const images = ["/png/food.png", "/png/food.png", "/png/food.png"];
const info = [
  { label: "영업시간", value: "11:00 - 21:00" },
  { label: "브레이크 타임", value: "15:00 - 17:00" },
  { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
];
const iconAndDesc: IconAndDesc[] = [
  { icon: "🍔", desc: "음식" },
  { icon: "🥨", desc: "디저트" },
  { icon: "🍺", desc: "술" },
  { icon: "🕹️", desc: "놀거리" },
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
      <CardWithIconList iconAndDesc={iconAndDesc} />
    </div>
  );
};

export default CardComponentPage;
