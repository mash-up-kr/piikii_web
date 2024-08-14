import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardInfoProps, CardSizeProps } from "@/model";
import { cn, getSizeClasses } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const CardWithImage: React.FC<CardInfoProps> = ({
  origin,
  place,
  link,
  rating,
  reviewCount,
  images,
  info,
  noShadow,
  cardClassName,
}) => {
  const router = useRouter();

  const originLogoSrc = React.useMemo(
    () =>
      origin === "AVOCADO" ? "/svg/naver-icon.svg" : "/svg/kakao-icon.svg",
    [origin]
  );

  return (
    <Card
      className={cn(
        "flex flex-col items-center w-[335px] max-h-[372px] py-[24px] rounded-xl border-0",
        noShadow && "shadow-none",
        cardClassName
      )}
    >
      <div className="flex flex-col w-[295px] h-[139px]">
        <div className="flex gap-x-[8px]">
          <CardHeader className="w-full">
            <div className="flex w-full gap-x-[8px] justify-between items-center h-[31px] text-semibold-22">
              <div className="flex items-center">{place}</div>
              <div className="flex gap-x-[4px] items-center">
                <div className="flex w-[16px] h-[16px]">
                  <Image
                    src={originLogoSrc}
                    alt="logo"
                    width={16}
                    height={16}
                    priority
                    unoptimized
                  />
                </div>
                <div className="text-[14px]">
                  {rating} ({reviewCount})
                </div>
              </div>
            </div>
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
        {info?.map((item, index) => (
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
          onClick={() => (link ? router.push(link) : null)}
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
      className={cn(
        "flex flex-col items-center justify-center rounded-xl ",
        cardSizeClass
      )}
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
      className={cn(
        "flex flex-col items-center justify-center rounded-xl ",
        cardSizeClass
      )}
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
