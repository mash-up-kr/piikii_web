"use client";

import React from "react";
import { ColumnsType } from "../edit-course/_components/DragAndDropArea";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import ResultArea from "@/components/common/Vote/ResultArea";
import { Button } from "@/components/common/Button/Button";
import { PasswordInputSheet } from "@/components/common/BottomSheet/PasswordInputSheet";
import useCloseVote from "./_hooks/useCloseVote";
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

const VoteProgressPage = () => {
  const { passwordSheet, handlePassword, onSubmit } = useCloseVote();

  return (
    <div className="relative">
      <NavigationBar
        className="px-[24px]"
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
        {/* Top Banner */}
        <div className="flex items-center px-[20px] py-[12px] bg-secondary-like-50">
          <Image
            src="/png/ic_twinkle_20.png"
            width={20}
            height={20}
            alt="twinkle"
          />
          <p className="flex-1 pl-[4px] text-semibold-14 text-secondary-like-700">
            투표가 마감되면 코스를 추천받을 수 있어요!
          </p>
        </div>

        <div className="pt-[33px] px-[20px]">
          <Title
            title={<span>6명이 투표를 진행했어요</span>}
            subtitle={<span>19일 일요일 오후 6시에 투표가 마감돼요</span>}
            subtitleClassName="text-neutral-600"
          />
        </div>

        <div className="pt-[32px] pb-[16px]">
          <ResultArea initialColumns={initialColumns} placesInfo={placesInfo} />
        </div>
      </div>

      <div className="fixed w-[375px] bottom-0 px-[20px] pt-[10px] pb-[20px] flex justify-between items-center gap-[7px] bg-white">
        <Button className="rounded-[14px] bg-primary-100 h-[56px] text-primary-700 hover:bg-primary-200">
          재투표 하기
        </Button>
        <Button
          className="rounded-[14px] h-[56px]"
          onClick={passwordSheet.onOpen}
        >
          투표 마감하기
        </Button>
      </div>

      <PasswordInputSheet
        title="투표 마감하기 비밀번호 입력"
        subTitle="비밀번호는 모임을 만든 사람이 알고있어요"
        isOpen={passwordSheet.isOpen}
        onInteractOutside={passwordSheet.onClose}
        onPasswordComplete={(result) => {
          handlePassword(result);
        }}
      />
    </div>
  );
};

export default VoteProgressPage;
