import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CardInfoProps } from "@/model";
import Image from "next/image";

export const CardWithSelectedOption: React.FC<CardInfoProps> = ({
  place,
  rating,
  reviewCount,
  images,
  onButtonClick,
  selected,
}) => {
  return (
    <Card
      className={`flex flex-col w-[335px] h-[104px] items-start justify-center cursor-pointer p-[12px] rounded-[16px] group-active:border-2 group-active:border-[#FF601C]`}
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
            <div className="flex flex-col max-w-[183px] h-[24px] items-start justify-center pr-[9px]">
              <div className="flex flex-row max-w-full items-center gap-x-[8px]">
                <span className="flex flex-row w-full max-w-[134px] whitespace-nowrap overflow-hidden text-ellipsis h-[21px] text-[16px] text-black font-semibold items-center">
                  {place}
                </span>
                <Badge className="flex w-[25px] h-[21px] px-[5px] py-[3px] border-none text-[10px] rounded-[6px] bg-[#F4EFFF]">
                  <span className="w-[15px] h-[15px] text-[#622DBC] font-semibold">
                    6명
                  </span>
                </Badge>
              </div>
              <div className="flex flex-row w-[183px] h-[24px] gap-x-[2px] items-center">
                <Image
                  src="/png/naver.png"
                  alt="naver"
                  width={12}
                  height={12}
                  className="items-center"
                  priority
                />
                <span className="text-[14px] max-w-[24px] h-[18px] text-black flex items-center">
                  {rating}
                </span>
                <span className="text-[14px] min-w-[36px] h-[18px] items-center flex text-[#B5B9C6]">
                  ({reviewCount})
                </span>
              </div>

              <div className="flex flex-row w-[183px] h-[79px] py-[4px] pr-[8px] mt-[8px] gap-x-[2px]">
                <span className="w-[46px] h-[15px] text-[10px] text-[#747B89]">
                  자세히 보기
                </span>
                <Image
                  src={"svg/ic_arrow_right.svg"}
                  alt="arrow"
                  width={10}
                  height={10}
                  priority
                  unoptimized
                />
              </div>
            </div>
            <button
              className={`flex w-[24px] h-[24px] items-center justify-center rounded-2xl  ${
                selected
                  ? "border-none"
                  : "border-2 border-[#E7E8EB] hover:border-[#FFD6D9]"
              }  mr-[8px]`}
              onClick={onButtonClick}
            >
              {selected && (
                <Image
                  src={"png/ic_check_circle-1_24.png"}
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
