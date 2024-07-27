import React from "react";
import { ColumnsType } from "../edit-course/_components/DragAndDropArea";
import ResultArea from "../../components/common/Vote/ResultArea";

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
    info: [
      { label: "영업시간", value: "11:00 - 21:00" },
      { label: "브레이크 타임", value: "15:00 - 17:00" },
      { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
    ],
  },
  {
    place: "스타벅스 강남점",
    link: "efgh",
    rating: "4.5",
    reviewCount: 1200,
    images: ["/png/food.png"],
    info: [
      { label: "영업시간", value: "11:00 - 21:00" },
      { label: "브레이크 타임", value: "15:00 - 17:00" },
      { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
    ],
  },
  {
    place: "맥도날드 홍대점",
    link: "ijkl",
    rating: "3.8",
    reviewCount: 530,
    images: ["/png/food.png"],
    info: [
      { label: "영업시간", value: "11:00 - 21:00" },
      { label: "브레이크 타임", value: "15:00 - 17:00" },
      { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
    ],
  },
  {
    place: "빕스 여의도점",
    link: "mnop",
    rating: "4.2",
    reviewCount: 870,
    images: ["/png/food.png"],
    info: [
      { label: "영업시간", value: "11:00 - 21:00" },
      { label: "브레이크 타임", value: "15:00 - 17:00" },
      { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
    ],
  },
  {
    place: "이디야 커피 신촌점",
    link: "qrst",
    rating: "4.0",
    reviewCount: 300,
    images: ["/png/food.png"],
    info: [
      { label: "영업시간", value: "11:00 - 21:00" },
      { label: "브레이크 타임", value: "15:00 - 17:00" },
      { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
    ],
  },
];

const VoteEditPage = () => {
  return (
    <div>
      <ResultArea initialColumns={initialColumns} placesInfo={placesInfo} />
    </div>
  );
};

export default VoteEditPage;
