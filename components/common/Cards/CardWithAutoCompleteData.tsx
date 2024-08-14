"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { useCourseContext } from "@/providers/course-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CardWithAutoCompleteData = () => {
  const router = useRouter();
  const { placeInfo } = useCourseContext();

  return (
    <div className="flex flex-col w-full gap-y-[8px]">
      <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
        {placeInfo[0]?.category}
      </p>
      <Card className=" border-none shadow-none">
        <div className="flex flex-col w-full h-[139px]">
          <div className="flex gap-x-[8px]">
            <CardHeader className="w-full">
              <div className="flex w-full gap-x-[8px] items-center h-[31px] text-semibold-22">
                <div className="flex items-center">{placeInfo[0]?.name}</div>
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
                  <div className="text-[14px]">
                    {placeInfo[0]?.starGrade} ({placeInfo[0]?.reviewCount})
                  </div>
                </div>
              </div>
            </CardHeader>
          </div>
          <div className="flex flex-row w-full gap-x-[9px] my-[16px]">
            {placeInfo[0]?.placeImageUrls.contents.map((src, index) => (
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
      </Card>
      {placeInfo[0]?.url ? (
        <button
          className="flex flex-row mt-[32px] items-center justify-center w-full h-[42px] bg-[#F9FAFB] py-[12px] px-[111px] rounded-2xl gap-x-[4px]"
          onClick={() => router.push(placeInfo[0]?.url)}
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
