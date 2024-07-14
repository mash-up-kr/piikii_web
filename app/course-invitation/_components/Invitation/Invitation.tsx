"use client";
import React, { Children } from "react";
import Image from "next/image";
import BasisSection from "@/components/common/Layout/BasisSection";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import { Input } from "@/components/common/Input/Input";
import { Button } from "@/components/common/Button/Button";
import { Textarea } from "@/components/ui/textarea";
import { PasswordInputSheet } from "@/components/common/BottomSheet/PasswordInputSheet";
import { StepType } from "../_hooks/useCourseInvitation";
import useInvitation from "./_hooks/useInvitation";

const DUMMY_IMAGES = [
  {
    id: 0,
    src: "pong_box_image_small.png",
  },
  {
    id: 1,
    src: "luppy_box_image_small.png",
  },
];

interface InvitationProps {
  handleStep: (step: StepType) => void;
}

const Invitation = ({ handleStep }: InvitationProps) => {
  const {
    name,
    message,
    isButtonDisabled,
    passwordSheet,
    passwordConfirmSheet,
    handleMessage,
    handleName,
    onSubmit,
    handlePassword,
    handlePasswordConfirm,
  } = useInvitation();
  return (
    <>
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={() => handleStep("course")}
          >
            <Image
              src="/png/ic_arrow_left_24.png"
              alt="ic_arrow_left_24.png"
              width={24}
              height={24}
            />
            <p className="text-semibold-15 text-neutral-700">
              모임 순서정하기
            </p>
          </div>
        }
      />

      <BasisSection className="flex flex-col mt-[56px] px-[20px]">
        <p className="text-bold-22">초대장 만들기</p>

        <p className="text-neutral-600 mt-[12px]">
          일행을 초대하고 함께 장소를 찾아보세요
        </p>

        <div className="flex mt-[32px] mb-[12px]">
          <p className="text-bold-18 mr-[6px]">모임 이름</p>
          <p className="text-bold-14 text-primary-700">필수</p>
        </div>

        <Input
          placeholder="모임 이름을 적어주세요"
          value={name}
          onChange={handleName}
        />

        <div className="text-bold-16 text-secondary-800 mt-[32px]">썸네일</div>

        <div className="flex gap-[5px] mt-[12px]">
          {Children.toArray(
            DUMMY_IMAGES.map((item, index) => {
              return (
                <Image
                  src={`/png/${item.src}`}
                  width={80}
                  height={40}
                  alt={`image-${item.src}-${index}`}
                />
              );
            })
          )}
        </div>

        <div className="mt-[16px]">
          <div className="">
            <Image
              src={`/png/pong_box_image_large.png`}
              width={334}
              height={167}
              alt="pong_box_image_large.png"
            />
          </div>
        </div>

        <div className="mt-[32px]">
          <p className="text-bold-16">하고 싶은 메시지</p>
          <Textarea
            className="mt-[12px]"
            value={message}
            onChange={handleMessage}
          />
        </div>

        <div className="w-full bottom-0 bg-white mt-[100px] mb-[10px]">
          <PasswordInputSheet
            title="모임 비밀번호 생성"
            subTitle="투표를 시작하거나 마감할 때 필요해요"
            isOpen={passwordSheet.isOpen}
            onInteractOutside={passwordSheet.onClose}
            onPasswordComplete={(result) => {
              handlePassword(result);
              passwordConfirmSheet.onOpen();
            }}
            trigger={
              <Button
                variant={isButtonDisabled ? "disabled" : "default"}
                className="h-[56px]"
                onClick={onSubmit}
              >
                다 적었어요
              </Button>
            }
          />
        </div>

        <PasswordInputSheet
          title="모임 비밀번호 다시 입력"
          subTitle="비밀번호를한번 더 확인합니다"
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

export default Invitation;
