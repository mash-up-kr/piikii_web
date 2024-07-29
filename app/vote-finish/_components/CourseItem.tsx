"use client";

import { useToast } from "@/components/common/Toast/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  id: string;
  type: "dessert" | "food" | "play";
  placeTitle: string;
  placeContact: string;
  placeAddress: string;
  distanceToNextLocation: number;
}

export default function CourseItem({
  id,
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
      case "dessert":
        return "카페";
      case "food":
        return "음식점";
      case "play":
        return "놀거리";
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
    router.push(`/vote-finish/edit?id=${id}`);
  };

  const handleClickCopy = async (type: "contact" | "address", text: string) => {
    await navigator.clipboard.writeText(text);
    toast.toast({
      title: `'${type === "contact" ? "연락처" : "주소"}'가 복사되었습니다.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Course Top Section */}
      <div className="flex gap-x-[8px] min-h-[144px]">
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

      {/* Distance To Next Location */}
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
          <span className={cn("px-[6px] py-[4px] rounded-[6px]", bubbleColor)}>
            {distanceToNextLocation}m
          </span>
        </div>
      </div>
    </div>
  );
}
