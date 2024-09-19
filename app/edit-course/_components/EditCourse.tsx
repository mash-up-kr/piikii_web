"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import DragAndDropArea from "../../edit-category/_components/DragAndDropArea";
import { useState } from "react";
import { ModalWithCategory } from "@/components/common/Modal/ModalWithCategory";

const EditCourse = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeftButtonClick = () => {
    setIsModalOpen(false);
  };

  const handleRightButtonClick = () => {
    setIsModalOpen(false);
    router.back();
  };
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar
        leftSlot={
          <div
            className="flex py-[16px] px-[12px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src="/png/ic_arrow_left_24.png"
              alt="ic_arrow_left_24.png"
              width={24}
              height={24}
            />
            <p className="flex items-center text-semibold-15 text-neutral-700">
              순서 편집하기
            </p>
          </div>
        }
      />
      <div className="flex items-center justify-start w-[218px] h-[31px] mt-[72px] mx-[20px] mb-[32px]">
        <p className="text-[22px] font-bold">어떤 순서로 가실 건가요?</p>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center max-w-[430px] mx-[20px]">
        <DragAndDropArea />
      </div>
      {isModalOpen && (
        <ModalWithCategory
          modalText={
            <>
              이 페이지를 벗어나면
              <br />
              변경한 순서가 저장되지 않아요
            </>
          }
          onLeftButtonText="취소"
          onRightButtonText="확인"
          onLeftButtonClick={handleLeftButtonClick}
          onRightButtonClick={handleRightButtonClick}
        />
      )}
    </div>
  );
};

export default EditCourse;
