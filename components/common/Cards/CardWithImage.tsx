import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSizeProps } from "@/interface";
import { getSizeClasses } from "@/lib/utils";

export default function CardWithImage() {
  //임시 배열 정의
  const images = ["/food.png", "/food.png", "/food.png"];
  const info = [
    { label: "영업시간", value: "11:00 - 21:00" },
    { label: "브레이크 타임", value: "15:00 - 17:00" },
    { label: "메모", value: "새우튀김을 꼭 시켜야 함" },
  ];

  return (
    <Card className="flex flex-col items-center w-[335px] max-h-[372px] py-[24px]">
      <div className="flex flex-col w-[295px] h-[139px]">
        <div className="flex flex-row gap-x-[8px]">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-x-[8px] justify-center items-center">
                <div className="flex w-[214px] h-[31px] items-center">
                  돈카춘 노원점
                </div>
                <div className="flex flex-row gap-x-[4px] w-[73px] h-[31px] items-center">
                  <div className="flex flex-row w-[16px] h-[16px]">
                    <Image
                      src="/naver.png"
                      alt="naver"
                      width={16}
                      height={16}
                      priority
                    />
                  </div>
                  <div className="text-[14px]">4.5 (30)</div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </div>
        <div className="flex flex-row gap-x-[9px] py-[15px]">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              className="rounded-lg"
              alt={`food${index + 1}`}
              width={92}
              height={92}
              priority
            />
          ))}
        </div>
      </div>
      <hr className="w-[295px] mt-[24px]" />
      <CardContent className="flex flex-col w-[295px] h-[161px] gap-y-[8px] my-[20px]">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex flex-row justify-between w-[295px] h-[21px] gap-x-[16px] text-[14px]"
          >
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
        <button className="flex flex-row mt-[12px] items-center justify-center w-[295px] h-[42px] bg-[#F9FAFB] py-[12px] px-[111px] rounded-2xl gap-x-[4px]">
          <div className="w-[55px] h-[18px] opacity-80 text-[12px] font-semibold">
            자세히 보기
          </div>
          <Image
            src="/ic_arrow_right.svg"
            className=""
            alt="arrow_right"
            width={12}
            height={12}
            priority
          />
        </button>
      </CardContent>
    </Card>
  );
}

export function CardWithLike({ size }: CardSizeProps) {
  const { cardSizeClass, imageSize } = getSizeClasses(size);

  return (
    <Card className={`flex flex-col items-center ${cardSizeClass}`}>
      <CardContent>
        <div
          className={`flex flex-col items-center justify-center ${cardSizeClass}`}
        >
          <Image
            src="/img_like.svg"
            alt="like"
            className=""
            width={imageSize}
            height={imageSize}
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function CardWithDislike({ size }: CardSizeProps) {
  const { cardSizeClass, imageSize } = getSizeClasses(size);

  return (
    <Card className={`flex flex-col items-center ${cardSizeClass}`}>
      <CardContent>
        <div
          className={`flex flex-col items-center justify-center ${cardSizeClass}`}
        >
          <Image
            src="/img_dislike.svg"
            alt="dislike"
            className=""
            width={imageSize}
            height={imageSize}
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
