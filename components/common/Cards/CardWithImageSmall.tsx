"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CardInfoProps } from "@/model";

export const CardWithImageSmall: React.FC<CardInfoProps> = ({
  origin,
  place,
  link,
  rating,
  reviewCount,
  images,
  category,
  onButtonClick,
}) => {
  const CategoryMap = {
    DESSERT: "dessert",
    DISH: "food",
    ALCOHOL: "alcohol",
    ARCADE: "arcade",
  } as const;

  const formattedRating = rating?.toFixed(2);

  const originLogoSrc = React.useMemo(
    () =>
      origin === "AVOCADO"
        ? "/svg/naver-icon.svg"
        : origin === "LEMON"
        ? "/svg/kakao-icon.svg"
        : null,
    [origin]
  );

  const getThumbnail = (
    category: keyof typeof CategoryMap,
    images: string[]
  ): string => {
    const defaultImageIndex = images.findIndex((image) =>
      image.includes(`default_${CategoryMap[category]}`)
    );
    return defaultImageIndex !== -1 ? images[defaultImageIndex] : images[0];
  };

  const thumbnail = React.useMemo(() => {
    return getThumbnail(category as keyof typeof CategoryMap, images);
  }, [category, images]);

  return (
    <Card
      className="flex flex-col items-start justify-center w-[160px] h-[157px] border-none shadow-none cursor-pointer"
      onClick={onButtonClick}
    >
      <CardContent className="flex flex-col w-full gap-y-[8px]">
        <div className="relative w-[160px] h-[110px] overflow-hidden rounded-[12px] items-center justify-center">
          <Image
            src={thumbnail}
            alt="like"
            width={160}
            height={110}
            className="absolute inset-0 w-full h-full transition-transform duration-300 hover:scale-110"
            priority
          />
        </div>
        <div className="flex flex-col w-full h-[39px] items-start">
          <span className="font-semibold text-[14px] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
            {place}
          </span>

          {originLogoSrc !== null && (
            <div className="flex flex-row w-[71px] h-[18px gap-x-[2px] items-center">
              <Image
                src={originLogoSrc}
                alt="logo"
                width={12}
                height={12}
                priority
              />
              {rating !== 0 && (
                <span className="text-[12px] max-w-[24px] h-[18px] items-center text-black">
                  {formattedRating}
                </span>
              )}
              {reviewCount !== 0 && (
                <span className="text-[12px] max-w-[31px] h-[18px] items-center text-[#B5B9C6]">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
