import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardInfoProps } from "@/model";
import Image from "next/image";
import { useMemo } from "react";
import { useToast } from "../Toast/use-toast";

export const CardWithSelectedOption: React.FC<CardInfoProps> = ({
  origin,
  place,
  rating,
  reviewCount,
  voteCount,
  images,
  onButtonClick,
  selected,
  link,
}) => {
  const toast = useToast();
  const originLogoSrc = useMemo(
    () =>
      origin === "AVOCADO" ? "/svg/naver-icon.svg" : "/svg/kakao-icon.svg",
    [origin]
  );

  const handleClickDetails = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (link && link.includes("http")) {
      window.open(link, "_blank");
    } else {
      toast.toast({ description: "존재하지 않는 링크 입니다." });
    }
  };

  return (
    <Card
      className={cn(
        `flex flex-col items-start justify-center cursor-pointer p-[12px] rounded-[16px] shadow-none border-none outline outline-1 outline-neutral-300`,
        selected && "outline-primary-700 outline-[2px]"
      )}
      onClick={onButtonClick}
    >
      <CardContent className="w-full">
        <div className="flex gap-[16px] w-full h-full">
          <div className="w-[80px] h-[80px]">
            <Image
              src={images[0]}
              alt="food"
              className="rounded-lg object-cover w-full h-full"
              width={80}
              height={80}
              priority
            />
          </div>

          <div className="flex w-full flex-1 items-center justify-between gap-x-[16px]">
            <div className="flex flex-col items-start justify-center pr-[9px] w-[167px]">
              <div className="flex w-full gap-x-[8px] items-center">
                <span className="truncate text-neutral-900 text-semibold-16">
                  {place}
                </span>
                <Badge className="flex h-[21px] px-[5px] py-[3px] border-none text-[10px] rounded-[6px] bg-[#F4EFFF] justify-center items-center">
                  <span className="flex whitespace-nowrap h-[15px] text-[#622DBC] font-semibold">
                    {voteCount}명
                  </span>
                </Badge>
              </div>
              <div className="flex gap-[2px] items-center">
                <Image
                  src={originLogoSrc}
                  alt="logo"
                  width={12}
                  height={12}
                  priority
                />
                <span className="text-secondary-700 text-semibold-14 flex items-center">
                  {rating}
                </span>
                <span className="text-secondary-700 text-regular-14 items-center flex text-opacity-50">
                  ({reviewCount ?? "-"})
                </span>
              </div>

              <div className="flex py-[4px] pr-[8px] mt-[8px] gap-x-[2px] items-center">
                <span
                  className="w-[46px] h-[15px] text-semibold-10 text-neutral-600"
                  onClick={handleClickDetails}
                >
                  자세히 보기
                </span>
                <Image
                  src={"/svg/ic_arrow_right.svg"}
                  alt="arrow"
                  width={10}
                  height={10}
                  priority
                  unoptimized
                />
              </div>
            </div>

            <button
              className={`flex w-[24px] h-[24px] items-center justify-center rounded-2xl ${
                selected
                  ? "border-none"
                  : "border-2 border-[#E7E8EB] hover:border-[#FFD6D9]"
              }  mr-[8px]`}
            >
              {selected && (
                <Image
                  src={"/svg/icon-check-circle-mono.svg"}
                  alt="check"
                  className=""
                  width={24}
                  height={24}
                  priority
                  unoptimized
                />
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
