import { Card, CardContent } from "@/components/ui/card";
import { CardInfoProps } from "@/model";
import Image from "next/image";

export const CardForCopiedContent: React.FC<CardInfoProps> = ({
  place,
  rating,
  reviewCount,
  images,
  onButtonClick,
}) => {
  return (
    <Card
      className={`group flex flex-col w-[335px] h-[104px] items-start justify-center cursor-pointer p-[12px] rounded-[16px] bg-[#FFF7F2] hover:bg-[#FFF1EB] active:bg-[#FFEAE1]  text-[#FF601C] hover:text-[#DD4808] active:text-[#BF3900]`}
    >
      <CardContent className="flex flex-col w-[295px] h-[80px]">
        <div className="flex flex-row w-full h-full">
          <Image
            src={images[0]}
            alt="food"
            className="rounded-lg"
            width={80}
            height={80}
            priority
          />
          <div className="flex flex-row pl-[12px] items-center justify-center gap-y-[4px]">
            <div className="flex flex-col w-[170px] h-[65px] items-start justify-center pr-[9px]">
              <span className="flex w-[99px] h-[18px] text-[12px] font-bold">
                복사한 장소 추가하기
              </span>
              <span className="flex-row w-full max-w-[170px] inline-block whitespace-nowrap overflow-hidden text-ellipsis h-[21px] text-[14px] text-black font-semibold items-center">
                {place}
              </span>
              <div className="flex flex-row gap-x-[2px] w-full h-[18px] items-center justify-start">
                <div className="flex flex-row w-[12px] h-[12px]">
                  <Image
                    src="/png/naver.png"
                    alt="naver"
                    width={12}
                    height={12}
                    priority
                  />
                </div>
                <span className="w-[24px] h-[18px] text-[12px] text-[#363A3C] font-semibold">
                  {rating}
                </span>
                <span className="w-[31px] h-[18px] text-[12px] text-[#363A3C] opacity-50">
                  ({reviewCount})
                </span>
              </div>
            </div>
            <button
              className="flex w-[32px] h-[32px] items-center justify-center rounded-2xl bg-[#FF601C] group-hover:bg-[#DD4808] group-active:bg-[#BF3900] mr-[8px]"
              onClick={onButtonClick}
            >
              <Image
                src={"svg/icon-x-mono.svg"}
                alt="plusIcon"
                className=""
                width={18}
                height={18}
                priority
                unoptimized
              />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
