"use client";
import { PlaceResponseDto } from "@/apis/place/types/dto";
import { LabelWithValue } from "@/app/add-course/_components/LabelWithValue";
import { CommonPlaceDetailFormType } from "@/app/add-course/_hooks/useAddPlaceDetailForm";
import { Card, CardHeader } from "@/components/ui/card";
import { useCourseContext } from "@/providers/course-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { UseFormRegister } from "react-hook-form";

export interface CardWithAutoCompleteDataProps {
  register: UseFormRegister<CommonPlaceDetailFormType>;
}

export const CardWithAutoCompleteData = ({
  register,
}: CardWithAutoCompleteDataProps) => {
  const { isClipboardText, autoData } = useCourseContext();
  const formattedStarGrade = autoData?.data?.starGrade?.toFixed(2);
  const router = useRouter();
  const placeUrl = autoData?.data?.url ?? "";

  return (
    <div className="flex flex-col w-full gap-y-[8px] mt-[32px]">
      <Card className=" border-none shadow-none">
        <div className="flex flex-col w-full">
          <div className="flex gap-x-[8px]">
            <CardHeader className="w-full">
              <div className="flex w-full gap-x-[8px] items-center h-[31px] text-semibold-22">
                <div className="flex items-center">{autoData?.data.name}</div>
                <div className="flex gap-x-[4px] items-center">
                  <div className="flex w-[16px] h-[16px]">
                    <Image
                      src="/svg/naver-icon.svg"
                      alt="naver"
                      width={16}
                      height={16}
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="text-[14px]">
                    {formattedStarGrade} ({autoData?.data?.reviewCount})
                  </div>
                </div>
              </div>
            </CardHeader>
          </div>
          <div className="flex flex-row w-full h-[100px] gap-x-[9px] my-[16px]">
            {autoData?.data?.placeImageUrls.contents.map((src, index) => (
              <Image
                key={index}
                src={src}
                className="rounded-lg"
                alt={`food${index + 1}`}
                width={100}
                height={100}
                priority
              />
            ))}
          </div>
        </div>
      </Card>
      {placeUrl && (
        <button
          className="flex flex-row items-center justify-center w-full h-[42px] bg-[#F9FAFB] py-[12px] px-[111px] rounded-2xl gap-x-[4px]"
          onClick={() => router.push(placeUrl)}
        >
          <div className="w-full h-[18px] opacity-80 text-[12px] font-semibold">
            링크 바로가기
          </div>
          <Image
            src="/svg/ic_arrow_right.svg"
            className=""
            alt="arrow_right"
            width={12}
            height={12}
            priority
            unoptimized
          />
        </button>
      )}
      {isClipboardText ? (
        <div className="flex flex-col items-start justify-center mt-[32px]">
          <div className="flex flex-col w-full gap-y-[28px]">
            <LabelWithValue
              type="openingHours"
              iconSrc="/svg/ic_clock_mono.svg"
              {...register("openingHours")}
            />
            <LabelWithValue
              type="location"
              iconSrc="/svg/ic_pin_location_mono.svg"
              {...register("address")}
            />
            <LabelWithValue
              type="link"
              iconSrc="/svg/ic_call_mono.svg"
              {...register("phoneNumber")}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center mt-[32px]">
          <div className="flex flex-row w-full items-center justify-between mb-[12px] cursor-pointer">
            <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
              영업정보
            </p>
          </div>
          <div className="flex w-[335px] p-5 flex-col justify-end items-start gap-5 rounded-lg border border-[#F0F1F5] bg-[#F9FAFB]">
            <LabelWithValue
              type="openingHours"
              iconSrc="/svg/ic_clock_mono.svg"
              placeholder="영업 시간을 남겨주세요"
              {...register("openingHours")}
            />
            <Image
              src={"/svg/ic_horizon.svg"}
              alt="horizon"
              width={295}
              height={0}
              unoptimized
            />
            <LabelWithValue
              type="location"
              iconSrc="/svg/ic_pin_location_mono.svg"
              placeholder="주소를 남겨주세요"
              {...register("address")}
            />
            <Image
              src={"/svg/ic_horizon.svg"}
              alt="horizon"
              width={295}
              height={0}
              unoptimized
            />
            <LabelWithValue
              type="link"
              iconSrc="/svg/ic_call_mono.svg"
              placeholder="전화번호를 남겨주세요"
              {...register("phoneNumber")}
            />
          </div>
        </div>
      )}
    </div>
  );
};
