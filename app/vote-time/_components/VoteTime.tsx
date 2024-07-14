"use client";

import BasisSection from "@/components/common/Layout/BasisSection";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import React, { Children } from "react";
import useVoteTime from "./_hooks/useVoteTime";

const VoteTime = () => {
  const { dates, handleDateClick, selectedDate } = useVoteTime();
  return (
    <>
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={() => null}
          >
            <Image
              src="/png/ic_arrow_left_24.png"
              alt="ic_arrow_left_24.png"
              width={24}
              height={24}
            />
            <p className="text-semibold-15 text-neutral-700">투표 시작하기</p>
          </div>
        }
      />

      <BasisSection className="mt-[72px] px-[20px]">
        <h2 className="text-bold-22 mb-[8px]">투표를 언제 마감할까요?</h2>

        <div className={selectedDate ? "visible" : "invisible"}>
          <span className="text-semibold-16 text-primary-700">
            {selectedDate?.format("DD")}일 {selectedDate?.format("dddd")} 오전
            12시 00분
          </span>
          &nbsp;
          <span className="text-neutral-800 text-semibold-16">에 마감</span>
        </div>

        <div className="mt-[56px] flex gap-[9px]">
          {Children.toArray(
            dates.map((item) => {
              const isSelected =
                selectedDate?.format("dd") === item.date.format("dd");
              return (
                <div
                  onClick={() => {
                    handleDateClick(item.date);
                  }}
                  className={`flex flex-col gap-[10px] w-[48px] items-center rounded-[9px] py-[10px]
                        ${isSelected ? "bg-neutral-900" : "bg-neutral-100"}
                    `}
                >
                  <p
                    className={`text-medium-16 ${
                      isSelected ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {item.date.format("DD")}
                  </p>
                  <p
                    className={`text-regular-14 ${
                      isSelected ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {item.dayOfWeek}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </BasisSection>
    </>
  );
};

export default VoteTime;
