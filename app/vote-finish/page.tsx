"use client";

import React from "react";
import { ColumnsType } from "../edit-course/_components/DragAndDropArea";
import ResultArea from "../../components/common/Vote/ResultArea";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import CourseItem from "./_components/CourseItem";
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
];

const VoteEditPage = () => {
  const router = useRouter();

  return (
    <div>
      <NavigationBar
        className="pr-[24px] pl-[40px]"
        title="코스 수정"
        rightSlot={
          <button className="flex justify-center items-center">
            <Image
              src={"/svg/ic_wrap_gray.svg"}
              alt="wrap"
              width={16}
              height={16}
            />
          </button>
        }
      />

      <div className="flex flex-col pt-[56px]">
        <div className="px-[20px]">
          <Title
            title={
              <span className="text-neutral-600 text-regular-15">
                강남으로 모이자 팀
              </span>
            }
            subtitle={
              <span className="text-bold-22 text-neutral-900">
                적합한 코스를 만들었어요
              </span>
            }
          />
        </div>

        <div className="flex flex-col pt-[40px] px-[20px] gap-y-[21px]">
          {/* SAMPLE DATA */}
          <CourseItem
            id="course"
            index={0}
            type="food"
            placeTitle="옥소반 상암점"
            placeContact="02-1234-5678"
            placeAddress="서울특별시 마포구 상암동 10-1"
            distanceToNextLocation={500}
          />

          <CourseItem
            id="course"
            index={1}
            type="food"
            placeTitle="옥소반 상암점"
            placeContact="02-1234-5678"
            placeAddress="서울특별시 마포구 상암동 10-1"
            distanceToNextLocation={1000}
          />

          <CourseItem
            id="course"
            index={2}
            type="food"
            placeTitle="옥소반 상암점"
            placeContact="02-1234-5678"
            placeAddress="서울특별시 마포구 상암동 10-1"
            distanceToNextLocation={1500}
          />
        </div>

        <div className="px-[20px] mt-[64px] mb-[24px]">
          <Image
            src="/png/vote-finish-banner.png"
            alt="banner"
            width={335}
            height={120}
            className="w-full cursor-pointer"
            unoptimized
            onClick={() => router.push("/vote-finish/result")}
          />
        </div>
      </div>
      {/* <ResultArea initialColumns={initialColumns} placesInfo={placesInfo} /> */}
    </div>
  );
};

export default VoteEditPage;
