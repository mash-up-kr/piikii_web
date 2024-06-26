import { Card, CardContent } from "@/components/ui/card";
import { CardInfoProps } from "@/model";
import Image from "next/image";

export const CardForCopiedContent: React.FC<CardInfoProps> = ({
  place,
  rating,
  numberOfReviews,
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
                  ({numberOfReviews})
                </span>
              </div>
            </div>
            <div
              className="flex w-[32px] h-[32px] items-center justify-center rounded-2xl bg-[#FF601C] group-hover:bg-[#DD4808] group-active:bg-[#BF3900] mr-[8px]"
              onClick={onButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
              >
                <path
                  d="M20.3316 11.7648L14.7123 11.7653L14.7123 6.14546L14.7125 6.14546L14.7121 6.13268C14.7008 5.80198 14.5615 5.48861 14.3235 5.2587C14.0855 5.02879 13.7676 4.90032 13.4367 4.90042C13.1058 4.90052 12.7879 5.02917 12.5501 5.25922C12.3123 5.48927 12.1731 5.80273 12.162 6.13343L12.1618 6.13342L12.1618 6.14602L12.1623 11.7653L6.54306 11.7648L6.54306 11.7648L6.54174 11.7648C6.29 11.7657 6.04413 11.8409 5.83506 11.9812C5.626 12.1214 5.46306 12.3203 5.36675 12.5529C5.27044 12.7855 5.24505 13.0414 5.29378 13.2884C5.34251 13.5353 5.46318 13.7624 5.64061 13.941L5.64147 13.9418C5.87162 14.172 6.19071 14.3153 6.5425 14.3153L12.1623 14.3153L12.1618 19.934C12.1618 19.9341 12.1618 19.9343 12.1618 19.9344C12.1616 20.1018 12.1944 20.2677 12.2584 20.4224C12.3224 20.5773 12.4163 20.718 12.5348 20.8365C12.6533 20.955 12.7941 21.049 12.9489 21.113C13.1036 21.1769 13.2694 21.2097 13.4368 21.2095C13.6043 21.2096 13.7701 21.1767 13.9249 21.1126C14.0797 21.0485 14.2204 20.9546 14.3389 20.8361C14.4573 20.7176 14.5513 20.577 14.6154 20.4221C14.6794 20.2674 14.7124 20.1015 14.7123 19.934C14.7123 19.934 14.7123 19.9339 14.7123 19.9338L14.7123 14.3153L20.331 14.3153C20.331 14.3153 20.331 14.3153 20.3311 14.3153C20.4985 14.3153 20.6643 14.2824 20.819 14.2183C20.9737 14.1543 21.1144 14.0604 21.2328 13.942C21.3513 13.8236 21.4452 13.6831 21.5094 13.5284C21.5735 13.3737 21.6065 13.2079 21.6066 13.0404C21.6066 12.8729 21.5737 12.7071 21.5097 12.5524C21.4456 12.3976 21.3517 12.257 21.2333 12.1386C21.115 12.0201 20.9744 11.9261 20.8197 11.862C20.665 11.7979 20.4992 11.7648 20.3317 11.7648L20.3316 11.7648Z"
                  fill="#FFEAE1"
                  stroke="#FFEAE1"
                  stroke-width="0.75"
                />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
