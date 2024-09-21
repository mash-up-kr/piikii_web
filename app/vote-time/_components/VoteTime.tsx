"use client";

import BasisSection from "@/components/common/Layout/BasisSection";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import React, { Children } from "react";
import useVoteTime from "./_hooks/useVoteTime";
import TimePicker from "./TimePicker/TimePicker";
import { PasswordInputSheet } from "@/components/common/BottomSheet/PasswordInputSheet";
import { Button } from "@/components/common/Button/Button";

const VoteTime = () => {
  const {
    dates,
    selectedDate,
    selectedTime,
    passwordConfirmSheet,
    passwordSheet,
    handleBack,
    onSubmit,
    handlePassword,
    handleDateClick,
    handleTimeChange,
    handlePasswordConfirm,
  } = useVoteTime();

  return (
    <>
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={handleBack}
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
            {selectedDate?.format("DD")}일 {selectedDate?.format("dddd")}{" "}
            {selectedTime?.ampm === "am" ? "오전" : "오후"} {selectedTime?.hour}
            시 {selectedTime?.minute}분
          </span>
          &nbsp;
          <span className="text-neutral-800 text-semibold-16">에 마감</span>
        </div>

        <div className="mt-[56px] flex gap-[9px] items-center justify-center">
          {Children.toArray(
            dates.map((item) => {
              const isSelected =
                selectedDate?.format("dd") === item.date.format("dd");
              return (
                <div
                  onClick={() => {
                    handleDateClick(item.date);
                  }}
                  className={`flex flex-col gap-[10px] w-[48px] items-center rounded-[9px] py-[10px] cursor-pointer ${
                    isSelected ? "bg-neutral-900" : "bg-neutral-100"
                  }`}
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

        <div className="mt-[46px]">
          <TimePicker value={selectedTime} onChange={handleTimeChange} />
        </div>

        <div className="w-full bottom-0 bg-white mt-[100px] mb-[10px]">
          <PasswordInputSheet
            title="투표 시작하기 비밀번호 입력"
            subTitle="비밀번호는 모임을 만든 사람이 알고있어요"
            isOpen={passwordSheet.isOpen}
            onInteractOutside={passwordSheet.onClose}
            onPasswordComplete={(result) => {
              handlePassword(result);
              passwordConfirmSheet.onOpen();
            }}
            trigger={
              <Button
                variant={"default"}
                className="h-[56px]"
                onClick={onSubmit}
              >
                완성하기
              </Button>
            }
          />
        </div>

        <PasswordInputSheet
          title="모임 비밀번호 다시 입력"
          subTitle="비밀번호를 한 번 더 확인합니다"
          isOpen={passwordConfirmSheet.isOpen}
          onInteractOutside={passwordConfirmSheet.onClose}
          onPasswordComplete={(result) => {
            handlePasswordConfirm(result);
          }}
        />
      </BasisSection>
    </>
  );
};

export default VoteTime;
