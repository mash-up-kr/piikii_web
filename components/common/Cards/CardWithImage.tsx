import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardInfoProps, CardSizeProps } from "@/model";
import { cn, getSizeClasses } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const CardWithImage: React.FC<CardInfoProps> = ({
  place,
  link,
  rating,
  numberOfReviews,
  images,
  info,
}) => {
  const router = useRouter();

  return (
    <Card className="flex flex-col items-center w-[335px] max-h-[372px] py-[24px]">
      <div className="flex flex-col w-[295px] h-[139px]">
        <div className="flex flex-row gap-x-[8px]">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-x-[8px] justify-center items-center">
                <div className="flex w-[214px] h-[31px] items-center">
                  {place}
                </div>
                <div className="flex flex-row gap-x-[4px] w-[73px] h-[31px] items-center">
                  <div className="flex flex-row w-[16px] h-[16px]">
                    <Image
                      src="/png/naver.png"
                      alt="naver"
                      width={16}
                      height={16}
                      priority
                    />
                  </div>
                  <div className="text-[14px]">
                    {rating} ({numberOfReviews})
                  </div>
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
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
        <button
          className="flex flex-row mt-[12px] items-center justify-center w-[295px] h-[42px] bg-[#F9FAFB] py-[12px] px-[111px] rounded-2xl gap-x-[4px]"
          onClick={() => router.push(link)}
        >
          <div className="w-[55px] h-[18px] opacity-80 text-[12px] font-semibold">
            자세히 보기
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
      </CardContent>
    </Card>
  );
};

export function CardWithLike({ size }: CardSizeProps) {
  const { cardSizeClass, imageSize } = getSizeClasses(size);

  return (
    <Card
      className={cn("flex flex-col items-center justify-center", cardSizeClass)}
    >
      <CardContent>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            cardSizeClass
          )}
        >
          <Image
            src="/svg/img_like.svg"
            alt="like"
            width={imageSize}
            height={imageSize}
            priority
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function CardWithDislike({ size }: CardSizeProps) {
  const { cardSizeClass, imageSize } = getSizeClasses(size);

  return (
    <Card
      className={cn("flex flex-col items-center justify-center", cardSizeClass)}
    >
      <CardContent>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            cardSizeClass
          )}
        >
          <Image
            src="/svg/img_dislike.svg"
            alt="dislike"
            width={imageSize}
            height={imageSize}
            priority
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CardWithImage;
