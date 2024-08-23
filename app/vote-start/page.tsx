"use client";

import { useGetPlacesQuery } from "@/apis/place/PlaceApi.query";
import { useGetRoomQuery } from "@/apis/room/RoomApi.query";
import { Button } from "@/components/common/Button/Button";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Title from "@/components/common/Title";
import { useToast } from "@/components/common/Toast/use-toast";
import useRoomUid from "@/hooks/useRoomUid";
import useShare from "@/hooks/useShare";
import createUUID from "@/utils/createUid";
import { userUidStorage } from "@/utils/web-storage/user-uid";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { useIsClient } from "usehooks-ts";
import { setCookie } from "../actions";
import { useGetVoteStatusQuery } from "@/apis/vote/VoteApi.query";

export default function VoteStart() {
  const router = useRouter();
  const toast = useToast();
  const isClient = useIsClient();
  const roomUid = useRoomUid();

  const { onShare } = useShare();

  const {
    data: roomData,
    isLoading: isRoomDataLoading,
    isError: isRoomDataError,
  } = useGetRoomQuery({
    variables: roomUid ?? "",
    options: { enabled: !!roomUid },
  });

  const {
    data: placeData,
    isLoading: isPlaceDataLoading,
    isError: isPlaceDataError,
  } = useGetPlacesQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const totalPlaceCount = useMemo(() => {
    if (placeData) {
      return placeData?.reduce((acc, cur) => acc + cur.places.length, 0);
    }
  }, [placeData]);

  const handleStartVote = () => {
    if (!roomUid || !placeData) {
      toast.toast({
        variants: "warning",
        title: "투표를 진행 할 방을 찾을 수 없습니다.",
      });
      return;
    }

    router.push(`/vote?roomUid=${roomUid}`);
  };

  /**
   * Set userUid to storage if it doesn't exist
   */
  useEffect(() => {
    const userUid = userUidStorage?.get()?.userUid;

    const setUserUidCookie = async (userUid: string) => {
      await setCookie("userUid", userUid);
    };

    if (!userUid) {
      const newUserUid = createUUID();
      userUidStorage?.set({ userUid: newUserUid });
      setUserUidCookie(newUserUid);
    }
  }, []);

  if (isPlaceDataLoading || isRoomDataLoading || !isClient)
    return (
      <Suspense>
        <FullScreenLoader />
      </Suspense>
    );

  return (
    <Suspense>
      <div className="flex flex-col h-full">
        <NavigationBar
          title={roomData?.data.name ?? "투표 시작"}
          rightSlot={
            <button
              className="flex justify-center items-center"
              onClick={async () =>
                await onShare({
                  url: `${window.location.origin}/vote-start?roomUid=${roomUid}`,
                  title: roomData?.data.name,
                  text: `‘${roomData?.data.name}’ 투표 시작❗ ${dayjs(
                    roomData?.data.voteDeadline ?? new Date()
                  )
                    .locale("ko")
                    .format("DD일 dddd A h시 mm분")}에 투표가 마감돼요`,
                })
              }
            >
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
          <div className="flex flex-col flex-1 bg-gradient-to-b from-[#FFEDE5] to-[#FAF1ED] pt-[32px]">
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
                placeData && (
                  <p className="text-neutral-600">
                    후보가 {totalPlaceCount}곳으로 추려졌어요
                  </p>
                )
              }
              titleClassName="text-black-22 text-center"
              subtitleClassName="text-regular-15 text-center"
            />

            <div className="lg:flex lg:flex-1 lg:items-center">
              <Image
                src="/gif/onboarding_2.gif"
                width={375}
                height={375}
                className="w-full"
                alt="onboarding-gif"
                unoptimized
              />
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="h-[10px] bg-gradient-to-b from-[#FAF1ED] to-white" />

          {/* Bottom Button */}
          <div className="px-[20px] pt-[10px] pb-[20px]">
            <Button
              className="rounded-[14px] h-[56px]"
              onClick={handleStartVote}
            >
              투표하기
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
