"use client";
import { Button } from "@/components/common/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleFindButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full items-start">
      <div className="flex flex-row gap-x-[12px] items-start mt-[32px] ml-[40px]">
        <Button
          className="w-[174px] h-[47px] rounded-[31px] text-[16px] py-[14px] px-[28px] bg-[#3F444D] text-white"
          onClick={() => router.push("/")}
        >
          새로운 모임 만들기
        </Button>
        <div className="flex flex-col gap-y-[12px]">
          <Button
            className="w-[174px] h-[47px] rounded-[31px] text-[16px] py-[14px] px-[28px] bg-[#3F444D] text-white"
            onClick={handleFindButtonClick}
          >
            모임 장소 찾기
            <div className="ml-[10px] w-[16px] h-[16px]">
              <Image
                src={
                  isExpanded === true
                    ? "/svg/ic_chevron_down_b.svg"
                    : "/svg/ic_chevron_right_b.svg"
                }
                width={16}
                height={16}
                alt={"logo"}
                unoptimized
              />
            </div>
          </Button>
          {isExpanded === true && (
            <div className="flex flex-col gap-y-[12px]">
              <Button
                className="w-[212px] h-[54px] bg-white text-black rounded-[31px] text-[16px] py-[10px] px-[28px]"
                onClick={() => router.push("https://map.naver.com/p/")}
              >
                <Image
                  src="/svg/naver-icon.svg"
                  alt="naver"
                  width={16}
                  height={16}
                  priority
                />
                <span className="pl-[10px]">네이버지도 바로가기</span>
              </Button>
              <Button
                className="w-[197px] h-[47px] bg-white text-black rounded-[31px] text-[16px] py-[10px] px-[28px]"
                onClick={() => router.push("https://map.kakao.com/")}
              >
                <Image
                  src="/svg/kakao-icon.svg"
                  alt="kakao"
                  width={16}
                  height={16}
                  priority
                  unoptimized
                />
                <span className="pl-[10px]">카카오맵 바로가기</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col min-w-[398px] w-full h-[243px] items-center justify-center ${
          isExpanded ? "mt-[125px]" : "mt-[250px]"
        }
          gap-y-[24px]`}
      >
        <div className="px-[4px] py-[3px]">
          <Image
            src={"/svg/Piki.svg"}
            width={212}
            height={95}
            alt={"chevron"}
            unoptimized
          />
        </div>
        <div className="flex items-center justify-center w-full h-[45px] text-[32px] text-white">
          함께 즐기는 모임의 시작, 피키
        </div>
        <div className="flex flex-row items-center justify-center gap-x-[8px]">
          <div className="bg-[#23272F] rounded-[16px] py-[11px] px-[20px] text-landing-food text-[20px]">
            밥
          </div>
          <div className="bg-[#23272F] rounded-[16px] py-[11px] px-[20px] text-landing-dessert text-[20px]">
            디저트
          </div>
          <div className="bg-[#23272F] rounded-[16px] py-[11px] px-[20px] text-landing-beer text-[20px]">
            술
          </div>
          <div className="bg-[#23272F] rounded-[16px] py-[11px] px-[20px] text-landing-play text-[20px]">
            놀거리
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
