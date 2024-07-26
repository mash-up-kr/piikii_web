"use client";
import React from "react";
import DragAndDropArea from "./_components/DragAndDropArea";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditCoursePage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={() => router.back()}
          >
            <Image
              src="/png/ic_arrow_left_24.png"
              alt="ic_arrow_left_24.png"
              width={24}
              height={24}
            />
            <p className="text-semibold-15 text-neutral-700">순서 편집하기</p>
          </div>
        }
      />
      <div className="flex items-start justify-start w-[218px] h-[31px] mt-[72px] mx-[20px] mb-[32px]">
        <p className="text-[22px] font-bold">어떤 순서로 가실 건가요?</p>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center w-[335px] mx-[20px]">
        <DragAndDropArea />
      </div>
    </div>
  );
};

export default EditCoursePage;
