"use client";

import React from "react";

import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import ResultArea from "@/components/common/Vote/ResultArea";
import { Button } from "@/components/common/Button/Button";
import { PasswordInputSheet } from "@/components/common/BottomSheet/PasswordInputSheet";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import useCloseVote from "@/app/vote-progress/_hooks/useCloseVote";
import { useRouter } from "next/navigation";
import { CardInfoProps } from "@/model";

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

const VoteResult = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <NavigationBar
        className="pl-[12px]"
        leftSlot={
          <div className="flex justify-start items-center">
            <button className="flex justify-center items-center">
              <Image
                src={"/svg/ic_chevron_left_black.svg"}
                alt="wrap"
                width={24}
                height={24}
                onClick={() => router.back()}
              />
            </button>
            <span className="pl-[4px] text-semibold-15 text-neutral-700">
              투표 결과
            </span>
          </div>
        }
      />
      <div className="flex flex-col pt-[56px]">
        {/* Top Banner */}
        <div className="flex items-center px-[20px] py-[12px] bg-secondary-like-50">
          <Image
            src="/png/ic_twinkle_20.png"
            width={20}
            height={20}
            alt="twinkle"
          />
          <p className="flex-1 pl-[4px] text-semibold-14 text-secondary-like-700">
            19일 일요일 오후 6시 00분에 마감된 투표입니다
          </p>
        </div>

        <div className="pt-[33px] px-[20px]">
          <Title
            title={<span>투표 결과를 공개할께요</span>}
            subtitle={<span>6명이 참여했어요</span>}
            subtitleClassName="text-neutral-600"
          />
        </div>

        <div className="pt-[32px] pb-[16px]">
          {/* <ResultArea initialColumns={initialColumns} placesInfo={placesInfo} /> */}
        </div>
      </div>
    </div>
  );
};

export default VoteResult;
