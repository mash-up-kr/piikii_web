"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { OrderType2 } from "@/app/edit-course/_components/DragAndDropArea";
import { iconInfo } from "@/lib/utils";

interface SheetWithCourseProps {
  handleItemClick: (type: OrderType2) => void;
}

export function SheetWithCourse({ handleItemClick }: SheetWithCourseProps) {
  return (
    <div className="">
      <Sheet key={"bottom"}>
        <SheetTrigger asChild>
          <button className="flex mt-[24px] items-center justify-center w-[335px] h-[61px] py-[20px] px-[24px] text-black rounded-[12px] border-2 border-dashed border-[#B5B9C6] bg-[#F9FAFB]">
            <div className="flex flex-row gap-x-[6px]">
              <Image
                src={"/svg/ic_plus_circle.svg"}
                width={20}
                height={20}
                alt="plus"
                unoptimized
              />
              <label className="w-[49px] h-[21px] font-medium text-[14px]">
                추가하기
              </label>
            </div>
          </button>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col items-start rounded-t-[16px] w-[375px]"
          side={"bottom"}
        >
          <div className="w-full flex justify-center">
            <div className="w-[34px] h-[5px] bg-[#E7E8EB] rounded-[4px] mt-[8px]" />
          </div>
          <SheetHeader className="pt-[25px] pl-[16px] pb-[6px]">
            <SheetTitle>추가하기</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col mb-[24px]">
            <div className="flex flex-col items-start">
              {iconInfo.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleItemClick(item.type as OrderType2)}
                  className="flex w-[375px] h-[59px] items-center py-[16px] px-[20px] active:bg-[#FFF7F2]"
                >
                  <div className="flex flex-row max-w-[68px] h-[27px] gap-x-[8px]">
                    <label className="w-[18px] h-[27px]">{item.icon}</label>
                    <label className="max-w-[42px] h-[27px]">
                      {item.label}
                    </label>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
