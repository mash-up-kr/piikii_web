"use client";

import { ScheduleType } from "@/apis/schedule/types/model";
import { useToast } from "@/components/common/Toast/use-toast";
import { cn } from "@/lib/utils";
import { distance, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  scheduleId: number;
  index: number;
  type: ScheduleType;
  placeTitle: string;
  placeContact: string;
  placeAddress: string;
  distanceToNextLocation: number;
}

export default function CourseItem({
  scheduleId,
  index,
  type,
  placeTitle,
  placeContact,
  placeAddress,
  distanceToNextLocation,
}: Props) {
  const router = useRouter();
  const toast = useToast();

  const typeLabel = useMemo(() => {
    switch (type) {
      case "DESSERT":
        return "카페";
      case "DISH":
        return "음식";
      case "ARCADE":
        return "놀거리";
      case "ALCOHOL":
        return "술";
      default:
        return "";
    }
  }, [type]);

  const emojiIconSrc = useMemo(
    () =>
      distanceToNextLocation >= 1000
        ? "/svg/ic_emoji_sad.svg"
        : "/svg/ic_emoji_happy.svg",
    [distanceToNextLocation]
  );

  const bubblePolygonSrc = useMemo(() => {
    if (distanceToNextLocation >= 1500) {
      return "/svg/ic_bubble_high.svg";
    } else if (distanceToNextLocation >= 1000) {
      return "/svg/ic_bubble_mid.svg";
    } else {
      return "/svg/ic_bubble_low.svg";
    }
  }, [distanceToNextLocation]);

  const bubbleColor = useMemo(() => {
    if (distanceToNextLocation >= 1500) {
      return "text-neutral-0 bg-secondary-dislike-700";
    } else if (distanceToNextLocation >= 1000) {
      return "text-secondary-dislike-900 bg-secondary-dislike-200";
    } else {
      return "text-secondary-like-900 bg-secondary-like-100";
    }
  }, [distanceToNextLocation]);

  const handleClickSwitch = () => {
    router.push(`/vote-finish/edit?scheduleId=${scheduleId}`);
  };

  const handleClickCopy = async (type: "contact" | "address", text: string) => {
    await navigator.clipboard.writeText(text);
    toast.toast({
      title: `'${type === "contact" ? "연락처" : "주소"}'가 복사되었습니다.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col relative">
      {/* Switch Bubble Tooltip */}
      {/* FIXME: API 붙히면서 로컬스토리지 연동으로 최초 1회만 뜨게끔 수정 할 예정 */}
      {index === 0 && (
        <motion.div
          className="absolute right-0 top-[-35px]"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            transition: {
              delay: 3,
              duration: 0.5,
            },
          }}
        >
          <Image
            src="/png/course-edit-tooltip.png"
            width={235}
            height={46}
            alt="tooltip"
          />
        </motion.div>
      )}

      {/* Distance To Next Location */}
      {distanceToNextLocation && (
        <div className="flex justify-start items-center gap-x-[8px] pt-[10px]">
          <Image src="/svg/ic_walk.svg" width={32} height={32} alt="walk" />
          <div className="flex items-center text-semibold-12 ml-[-8px]">
            <Image
              src={bubblePolygonSrc}
              width={8}
              height={6}
              unoptimized
              alt="bubble-polygon"
            />
            <span
              className={cn(
                "px-[6px] py-[4px] rounded-[6px] border-transparent ml-[-1px]",
                bubbleColor
              )}
            >
              {distanceToNextLocation}m
            </span>
            {distanceToNextLocation >= 1500 && (
              <span className="ml-[8px] text-secondary-dislike-900">
                조금 멀어요
              </span>
            )}
          </div>
        </div>
      )}

      {/* Course Top Section */}
      <div
        className={cn(
          "flex gap-x-[8px] min-h-[144px]",
          index !== 0 && "mt-[21px]"
        )}
      >
        {/* Top-Left Section */}
        <div className="flex flex-col gap-y-[12px]">
          <Image
            src={emojiIconSrc}
            width={32}
            height={32}
            alt="emoji"
            unoptimized
          />
          <div className="flex justify-center items-end flex-1">
            <div className="bg-neutral-200 rounded-full w-[2px] h-full" />
          </div>
        </div>

        {/* Top-Right Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center pl-[4px]">
            <div>
              <p className="text-semibold-14 text-neutral-500">{typeLabel}</p>
              <p className="text-semibold-18 text-neutral-900">{placeTitle}</p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="w-[30px] h-[30px] flex justify-center items-center rounded-[16px] bg-neutral-100"
                onClick={handleClickSwitch}
              >
                <Image
                  src="/svg/icon-arrow-left-right-mono.svg"
                  width={16}
                  height={16}
                  alt="arrow"
                  unoptimized
                />
              </button>
            </div>
          </div>

          <div className="rounded-[12px] bg-neutral-100 mt-[12px] mb-[14px] text-neutral-600">
            <div className="flex items-center p-[12px]">
              <Image
                src="/svg/icon-call-mono.svg"
                height={14}
                width={14}
                alt="phone-number"
                unoptimized
              />
              <span className="flex-1 pl-[6px] pr-[16px] overflow-ellipsis text-semibold-12">
                {placeContact}
              </span>
              <button
                className="text-medium-12"
                onClick={() => handleClickCopy("contact", placeContact)}
              >
                복사
              </button>
            </div>
            <div className="flex items-center p-[12px]">
              <Image
                src="/svg/icon-pin-location-mono.svg"
                height={14}
                width={14}
                alt="location"
                unoptimized
              />
              <span className="flex-1 pl-[6px] pr-[16px] overflow-ellipsis text-semibold-12">
                {placeAddress}
              </span>
              <button
                className="text-medium-12"
                onClick={() => handleClickCopy("address", placeAddress)}
              >
                복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
