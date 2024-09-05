"use client";

import React, { useRef, useState, TouchEvent, useEffect, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CategoryChip } from "./CategoryChip";
import useCopyPasted from "../_hooks/useCopyPasted";
import { Input } from "@/components/common/Input/Input";
import useIsMobile from "./_hooks/useIsMobile";
import { CardForCopiedContent } from "@/components/common/Cards/CardForCopiedContent";
import scheduleApi from "@/apis/schedule/ScheduleApi";
import roomApi from "@/apis/room/RoomApi";
import { useCourseContext } from "@/providers/course-provider";
import { roomUidStorage } from "@/utils/web-storage/room-uid";
import { useGetPlacesQuery } from "@/apis/place/PlaceApi.query";
import { useCreatePlace } from "@/apis/origin-place/OriginPlaceApi.mutation";
import { PlaceContainer } from "./PlaceContainer";
import useShare from "@/hooks/useShare";
import { RoomResponse } from "@/apis/room/types/model";
import { ModalWithVote } from "@/components/common/Modal/ModalWithVote";

export interface AddCourseProps {
  data: RoomResponse;
}

const AddCourse = ({ data }: AddCourseProps) => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const { clipboardText, setClipboardText } = useCopyPasted();

  const [placeUrl, setPlaceUrl] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showAlternateInput, setShowAlternateInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadyToVote, setIsReadyToVote] = useState(false);
  const searchParams = useSearchParams();

  const roomUid = searchParams.get("roomUid") || "";
  const {
    roomInfo,
    setRoomInfo,
    roomPlacesInfo,
    setRoomPlacesInfo,
    categoryList,
    setCategoryList,
    isClipboardText,
    setIsClipboardText,
    addPlaceInfo,
    autoData,
    setAutoData,
  } = useCourseContext();
  const [selectedChip, setSelectedChip] = useState<number | null | undefined>(
    null
  );

  const { data: currentPlacesData, refetch } = useGetPlacesQuery({
    variables: { roomUid },
  });

  const naverMapRegex = /https?:\/\/naver\.me\/[a-zA-Z0-9]+/;
  const kakaoMapRegex = /https?:\/\/place\.map\.kakao\.com\/[0-9]+/;

  const validateText = (text: string) => {
    console.log(text, "text?????????");
    if (isMobile) {
      const naverMatch = text.match(naverMapRegex);
      const kakaoMatch = text.match(kakaoMapRegex);
      return naverMatch ? naverMatch[0] : kakaoMatch ? kakaoMatch[0] : null;
    } else {
      return naverMapRegex.test(text) || kakaoMapRegex.test(text);
    }
  };

  const isValidClipboardText = validateText(clipboardText);
  const isValidPlaceUrl = validateText(placeUrl);

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      setSelectedChip(categoryList[0].scheduleId);
    }
  }, [categoryList]);

  useEffect(() => {
    if (currentPlacesData) {
      setRoomPlacesInfo(currentPlacesData);
    }
  }, [currentPlacesData, setRoomPlacesInfo]);

  useEffect(() => {
    refetch();
  }, [currentPlacesData, setRoomPlacesInfo]);

  const { mutate: createPlaceMutate } = useCreatePlace({
    options: {
      onSuccess: (res) => {
        if (res) {
          setAutoData(res);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const filteredPlaces = useMemo(() => {
    if (
      !currentPlacesData ||
      !Array.isArray(currentPlacesData) ||
      categoryList === null ||
      currentPlacesData?.length === 0
    ) {
      return [];
    }

    if (selectedChip === null) {
      const defaultPlaces = currentPlacesData[0]?.places || [];

      return defaultPlaces;
    } else {
      const matchingPlaces =
        currentPlacesData.find((item) => item.scheduleId === selectedChip)
          ?.places || [];
      return matchingPlaces;
    }
  }, [currentPlacesData, selectedChip, roomPlacesInfo]);

  const hasPlaces = useMemo(() => {
    return filteredPlaces.length > 0;
  }, [filteredPlaces]);

  const fetchCoursePageData = async (roomUid: string) => {
    try {
      const currentSchedule = await scheduleApi.readSchedules({ roomUid });
      const currentRoom = await roomApi.readRoom(roomUid);

      setCategoryList(currentSchedule.data.schedules);
      setRoomInfo(currentRoom.data);
      return;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchCoursePageData(roomUid);
  }, [roomUid]);

  useEffect(() => {
    if (filteredPlaces.length > 0) {
      setIsReadyToVote(true);
    } else {
      setIsReadyToVote(false);
    }
  }, [filteredPlaces]);

  useEffect(() => {
    const fetchData = async () => {
      if (clipboardText && isValidClipboardText) {
        setShowInput(false);
        setIsClipboardText(true);
        createPlaceMutate({ url: clipboardText });
      } else if (placeUrl && isValidPlaceUrl) {
        console.log(placeUrl, "?????");
        setShowInput(false);
        setIsClipboardText(true);
        createPlaceMutate({ url: placeUrl });
      } else if (
        (clipboardText && !isValidClipboardText) ||
        (placeUrl && !isValidPlaceUrl)
      ) {
        setShowInput(false);
        setShowAlternateInput(true);
        setTimeout(() => {
          setShowAlternateInput(false);
          setShowInput(true);
          setIsClipboardText(false);
          setPlaceUrl("");
          setClipboardText("");
        }, 3000);
      } else {
        setShowInput(true);
      }
    };

    fetchData();
  }, [clipboardText, isMobile, placeUrl]);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (sliderRef.current) {
      if (touchStartX - touchEndX > 50) {
        sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
      } else if (touchStartX - touchEndX < -50) {
        sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    }
  };

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  const { onShare } = useShare();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-x-[17px] cursor-pointer px-[20px] py-[11px]">
        <p className="flex w-[232px] items-center text-semibold-15 text-neutral-700">
          {roomInfo?.name}
        </p>

        <Button
          className="flex border-2 border-[#E7E8EB] w-[86px] h-[34px] py-[8px] px-[12px] bg-white gap-[4px]"
          onClick={() => {
            !isReadyToVote
              ? setIsModalOpen(true)
              : router.push(`/vote-start/?roomUid=${roomUid}`);
          }}
        >
          <p className="font-semibold text-neutral-700 text-[12px]">투표시작</p>
          <Image
            width={16}
            height={16}
            src="/gif/vote_button.gif"
            alt="vote_button.gif"
            unoptimized
          />
        </Button>
      </div>
      <div
        className={`flex flex-col px-[20px] w-[335px] ${
          isValidPlaceUrl || isValidClipboardText ? "h-[148px]" : "h-[103px]"
        } mt-[16px]`}
      >
        <div className="flex flex-row w-full font-extrabold h-[31px] text-[22px] mb-[16px]">
          <p className="text-[#FF601C]">투표 후 코스</p>
          <p>를 추천받아요</p>
        </div>

        {showAlternateInput ? (
          <div className="flex w-[335px] h-[56px] px-[20px] py-[12px] gap-x-[16px] bg-[#FEF1F2] border-2 border-[#FFD6D9] rounded-[32px] items-center">
            <Input
              className="rounded-none p-0 shadow-none focus:bg-transparent w-[251px] h-[24px] bg-transparent border-none text-[#747B89]"
              placeholder="올바른 링크를 넣어주세요"
              value={"올바른 링크를 넣어주세요"}
              disabled={true}
            />
            <Image
              src={"/svg/ic_exclamation_circle.svg"}
              alt="arrow"
              width={32}
              height={32}
              unoptimized
            />
          </div>
        ) : showInput ? (
          <div className="flex w-[335px] h-[56px] px-[20px] py-[12px] gap-x-[16px] bg-[#FFF7F2] border-2 border-[#FFF1EB] rounded-[32px] items-center">
            <Input
              className="rounded-none p-0 shadow-none focus:bg-transparent w-[251px] h-[24px] bg-transparent border-none text-[#747B89]"
              placeholder="네이버, 카카오 링크를 넣어주세요"
              value={clipboardText || placeUrl}
              onChange={(e) => {
                setPlaceUrl(e.target.value);
              }}
            />
            <Image
              src={"/png/ic_arrow_left_circle_32.png"}
              alt="arrow"
              width={32}
              height={32}
              onClick={() => {
                if (isValidClipboardText || isValidPlaceUrl) {
                  router.push(
                    `add-course/detail?roomUid=${
                      roomUidStorage?.get()?.roomUid
                    }`
                  );
                }
              }}
            />
          </div>
        ) : (
          autoData && (
            <CardForCopiedContent
              name={autoData.data.name}
              url={autoData.data.url}
              placeImageUrls={autoData.data.placeImageUrls}
              starGrade={autoData.data.starGrade}
              reviewCount={autoData.data.reviewCount}
              origin={autoData.data.origin}
            />
          )
        )}
      </div>
      <div
        className="flex flex-row mt-[8px] mx-[20px] w-[335px] h-[37px] items-center py-[8px] pr-[12px]"
        onClick={() =>
          router.push(
            `add-course/detail?roomUid=${roomUidStorage?.get()?.roomUid}`
          )
        }
      >
        <div className="flex flex-row items-center justify-start gap-x-[6px] cursor-pointer">
          <Image
            src={"/png/ic_plus_circle_20.png"}
            alt="plus"
            width={20}
            height={20}
          />
          <p
            className="w-full text-[14px] font-semibold text-[#B5B9C6]"
            onClick={() => {
              setAutoData(null);
              router.push(
                `add-course/detail?roomUid=${roomUidStorage?.get()?.roomUid}`
              );
            }}
          >
            직접 추가
          </p>
        </div>
      </div>
      <div className="flex w-[375px] h-[12px] bg-[#F9FAFB] my-[20px]" />

      <div className="flex flex-row justify-between items-center">
        <div
          className="flex flex-start pl-[20px] w-full h-[37px] items-center gap-x-[8px] overflow-x-scroll scrollbar-hide"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {categoryList?.map(
            (item) =>
              item.scheduleId !== null &&
              item.scheduleId !== undefined &&
              item.name && (
                <CategoryChip
                  key={item.scheduleId}
                  title={item.name}
                  selected={selectedChip === item.scheduleId}
                  onClick={() => handleChipClick(item.scheduleId as number)}
                />
              )
          )}
        </div>
        <div className="relative flex items-center justify-center w-[64px] h-[37px] mr-[20px] cursor-pointer">
          <div className="absolute left-[-16px] w-[16px] h-full">
            <Image
              src={"/svg/gradient.svg"}
              width={16}
              height={37}
              alt="gradient"
            />
          </div>
          <div className="flex items-center justify-center w-[32px] h-[32px] border-2 border-[#E7E8EB] rounded-[16px]">
            <Image
              src={"/png/ic_arrow_left_right_20.png"}
              alt="plus"
              width={16}
              height={16}
              onClick={() => router.push(`edit-course?roomUid=${roomUid}`)}
            />
          </div>
        </div>
      </div>
      {!hasPlaces ? (
        <div className="flex flex-col w-full h-full items-center justify-center mt-[56px]">
          <div className="flex flex-col items-center justify-center w-full h-[197px] gap-y-[12px]">
            <div className="flex w-[108px] h-[104px] items-center justify-center">
              <Image
                src={"/png/img_sample.png"}
                alt="sample"
                width={108}
                height={104}
              />
            </div>
            <div className="flex flex-col w-full items-center justify-center text-[14px] text-[#8B95A1]">
              <p className="flex w-full items-center justify-center">
                일행을 초대하고
              </p>
              <p className="flex w-full items-center justify-center">
                함께 장소를 추가하세요
              </p>
            </div>
            <Button
              className="w-[112px] h-[41px] hover:bg-transparent bg-transparent border-2 gap-x-[4px] rounded-[28px] border-[#FF601C] text-[#FF601C]"
              onClick={async () =>
                await onShare({
                  url: location.href,
                  title: data.name,
                  text: data.message,
                })
              }
            >
              <Image
                src={"/svg/ic_wrap.svg"}
                alt="wrap"
                width={16}
                height={16}
              />
              <p>일행 초대</p>
            </Button>
          </div>
        </div>
      ) : (
        categoryList && (
          <PlaceContainer
            placesData={{
              scheduleId: selectedChip
                ? selectedChip
                : (categoryList[0]?.scheduleId as number),
              scheduleName:
                categoryList?.find(
                  (category) => category.scheduleId === selectedChip
                )?.name || categoryList[0]?.name,
              places: filteredPlaces,
            }}
            scheduleInfo={
              categoryList?.find(
                (category) => category.scheduleId === selectedChip
              )?.type || categoryList[0].type
            }
          />
        )
      )}
      {isModalOpen && (
        <ModalWithVote onButtonClick={() => setIsModalOpen((prev) => !prev)} />
      )}
    </div>
  );
};

export default AddCourse;
