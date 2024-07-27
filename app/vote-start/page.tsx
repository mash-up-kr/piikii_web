import { Button } from "@/components/common/Button/Button";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Title from "@/components/common/Title";
import Image from "next/image";

export default function VoteStart() {
  return (
    <div className="flex flex-col h-full">
      <NavigationBar
        title="투표 시작"
        rightSlot={
          <button className="flex justify-center items-center">
            <Image
              src={"/svg/ic_wrap_gray.svg"}
              alt="wrap"
              width={16}
              height={16}
            />
          </button>
        }
        className="pr-[24px] pl-[40px] !bg-[#FFEDE5]"
      />

      {/* Content */}
      <div className="flex flex-col h-full pt-[56px]">
        <div className="flex-1 bg-gradient-to-b from-[#FFEDE5] to-[#FAF1ED] pt-[32px]">
          <Title
            title={
              <>
                <span className="text-primary-700 block">
                  투표가 시작되었어요.
                </span>
                <span className="text-neutral-900 text-opacity-90">
                  투표 후 코스를 추천받아요
                </span>
              </>
            }
            subtitle={
              <p className="text-neutral-600">후보가 23곳으로 추려졌어요</p>
            }
            titleClassName="text-black-22 text-center"
            subtitleClassName="text-regular-15 text-center"
          />
        </div>

        {/* Bottom Gradient */}
        <div className="h-[10px] bg-gradient-to-b from-[#FAF1ED] to-white" />

        {/* Bottom Button */}
        <div className="px-[20px] pt-[10px] pb-[20px]">
          <Button className="rounded-[14px] h-[56px]">투표하기</Button>
        </div>
      </div>
    </div>
  );
}
