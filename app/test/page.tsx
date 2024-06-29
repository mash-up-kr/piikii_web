"use client";
import CardWithSelectedCourse from "@/components/common/Cards/CardWithSelectedCourse";
import { IconInfo } from "@/model";
import React, { useState } from "react";

const images = ["/png/food.png", "/png/food.png", "/png/food.png"];
const info = [
  { label: "영업시간", value: "11:00 - 21:00" },
  { label: "브레이크 타임", value: "15:00 - 17:00" },
  { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
];

const iconInfo: IconInfo[] = [
  { icon: "🍔", label: "음식", type: "food" },
  { icon: "🥨", label: "디저트", type: "dessert" },
  { icon: "🍺", label: "술", type: "beer" },
  { icon: "🕹️", label: "놀거리", type: "play" },
];

export type OrderType = "food" | "dessert" | "beer" | "play";

export type ValueType = { id: string; text: string; type: OrderType };

export interface EditedDataType {
  food: ValueType[];
  dessert: ValueType[];
  beer: ValueType[];
  play: ValueType[];
}

export interface Column {
  id: string;
  list: Record<OrderType, ValueType[]>;
}

export interface Columns {
  [key: string]: Column;
}

const initialColumns: Columns = {
  todo: {
    id: "todo",
    list: {
      food: [
        { id: "0", text: "item 1", type: "food" },
        { id: "1", text: "item 2", type: "food" },
      ],
      dessert: [{ id: "2", text: "item 3", type: "dessert" }],
      beer: [],
      play: [],
    },
  },
};
//오더링을 관리하는 배열 필요 !

// const initialColumns: Columns = {
//   todo: {
//     id: "todo",
//     list: ["item 1", "item 2", "item 3"],
//   },
// };
const seletedData = []; //length와 순서를 모두 관리

const CardComponentPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <CardWithSelectedCourse data={initialColumns} />
      <div className="mb-10 font-bold flex w-[100px] items-center justify-center">
        추가하기
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-y-2">
        {iconInfo?.map((item, key) => (
          <div key={item.label}>
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponentPage;
