"use client";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CardWithAutoCompleteData = () => {
  const router = useRouter();
  const link = "https://naver.me/5IFskD5U";
  return (
    <div className="flex flex-col gap-y-[8px]">
      <p className="w-[59px] font-bold text-[#747B89] text-[16px]">일식</p>
      <Card className=" border-none shadow-none">
        <div className="flex flex-col w-[295px] h-[139px]">
          <div className="flex gap-x-[8px]">
            <CardHeader className="w-full">
              <div className="flex w-full gap-x-[8px] items-center h-[31px] text-semibold-22">
                <div className="flex items-center">돈카춘 홍대점</div>
                <div className="flex gap-x-[4px] items-center">
                  <div className="flex w-[16px] h-[16px]">
                    <Image
                      src="/png/naver.png"
                      alt="naver"
                      width={16}
                      height={16}
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="text-[14px]">4.5 (30)</div>
                </div>
              </div>
            </CardHeader>
          </div>
          <div className="flex flex-row gap-x-[9px] py-[15px]">
            {/* {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                className="rounded-lg"
                alt={`food${index + 1}`}
                width={92}
                height={92}
                priority
              />
            ))} */}
          </div>
        </div>
      </Card>
      {link ? (
        <button
          className="flex flex-row mt-[12px] items-center justify-center w-full h-[42px] bg-[#F9FAFB] py-[12px] px-[111px] rounded-2xl gap-x-[4px]"
          onClick={() => router.push(link)}
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
      ) : null}
    </div>
  );
};
