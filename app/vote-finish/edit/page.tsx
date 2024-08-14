"use client";

import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import EditOptionArea from "@/components/common/Vote/EditOptionArea";
import { CardInfoProps } from "@/model";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
] as CardInfoProps[];

export default function VoteEditPage() {
  const router = useRouter();

  return (
    <div>
      <NavigationBar
        title="코스 수정하기"
        leftSlot={
          <button
            className="flex justify-center items-center"
            onClick={() => router.back()}
          >
            <Image
              src="/svg/ic_chevron_left_black.svg"
              width={24}
              height={24}
              alt="left-chevron"
            />
          </button>
        }
        rightSlot={
          <button>
            <span className="text-bold-15 text-primary-700">완료</span>
          </button>
        }
        className="pl-[12px] pr-[20px]"
      />

      <div className="pt-[56px]">
        <EditOptionArea
          initialColumns={initialColumns}
          placesInfo={placesInfo}
        />
      </div>
    </div>
  );
}
