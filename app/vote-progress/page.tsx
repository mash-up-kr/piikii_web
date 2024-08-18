"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import ResultArea from "@/components/common/Vote/ResultArea";
import { Button } from "@/components/common/Button/Button";
import { PasswordInputSheet } from "@/components/common/BottomSheet/PasswordInputSheet";
import useCloseVote from "./_hooks/useCloseVote";
import { useIsClient } from "usehooks-ts";

import useRoomUid from "@/hooks/useRoomUid";
import { useGetPlacesQuery } from "@/apis/place/PlaceApi.query";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { useGetVotesQuery } from "@/apis/vote/VoteApi.query";
import { VoteResultByScheduleResponseDto } from "@/apis/vote/types/dto";
import { useGetRoomQuery } from "@/apis/room/RoomApi.query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import useShare from "@/hooks/useShare";

const VoteProgressPage = () => {
  const { passwordSheet, handlePassword, onSubmit } = useCloseVote();

  const router = useRouter();
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
    data: voteData,
    isLoading: isVoteDataLoading,
    isError: isVoteDataError,
  } = useGetVotesQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
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

  const [selectedSchedule, setSelectedSchedule] =
    React.useState<VoteResultByScheduleResponseDto>();

  const votedSchedules = useMemo(
    () => voteData?.data.result ?? [],
    [voteData?.data.result]
  );

  const totalCountOfVote = useMemo(() => {
    const firstIndexSchedule = votedSchedules[0];
    const firstIndexPlace = firstIndexSchedule?.places[0];

    return firstIndexPlace?.countOfVote ?? 0;
  }, [votedSchedules]);

  useEffect(() => {
    if (votedSchedules) {
      setSelectedSchedule(votedSchedules[0]);
    }
  }, [votedSchedules]);

  if (
    !isClient ||
    isRoomDataLoading ||
    isPlaceDataLoading ||
    isVoteDataLoading ||
    isRoomDataError ||
    isPlaceDataError ||
    isVoteDataError ||
    !roomData ||
    !placeData ||
    !voteData ||
    !selectedSchedule
  )
    return <FullScreenLoader label={`투표 결과를\n집계하고 있어요`} />;

  return (
    <Suspense>
      <div className="relative">
        <NavigationBar
          className="px-[24px]"
          rightSlot={
            <button
              className="flex justify-center items-center"
              onClick={async () =>
                await onShare({
                  url: `${window.location.origin}/vote-progress?roomUid=${roomUid}`,
                  title: roomData.data.name,
                  text: `‘${roomData.data.name}’ 투표 시작❗ ${dayjs(
                    roomData.data.voteDeadline
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
        />
        <div className="flex flex-col pt-[56px]">
          {/* Top Banner */}
          <div className="flex items-center px-[20px] py-[12px] bg-secondary-like-50">
            <Image
              src="/png/ic_twinkle_20.png"
              width={20}
              height={20}
              alt="twinkle"
            />
            <p className="flex-1 pl-[4px] text-semibold-14 text-secondary-like-700">
              투표가 마감되면 코스를 추천받을 수 있어요!
            </p>
          </div>

          <div className="pt-[33px] px-[20px]">
            <Title
              title={<span>{totalCountOfVote}명이 투표를 진행했어요</span>}
              subtitle={
                <span>
                  {dayjs(roomData.data.voteDeadline)
                    .locale("ko")
                    .format("DD일 dddd A h시")}
                  에 투표가 마감돼요
                </span>
              }
              subtitleClassName="text-neutral-600"
            />
          </div>

          <div className="pt-[32px] pb-[16px]">
            <ResultArea
              schedules={
                votedSchedules?.map(({ scheduleId, scheduleName }) => ({
                  scheduleId,
                  scheduleName,
                })) ?? []
              }
              selectedSchedule={selectedSchedule}
              onClickSchedule={(scheduleId) => {
                setSelectedSchedule(
                  votedSchedules?.find((v) => v.scheduleId === scheduleId)
                );
              }}
            />
          </div>
        </div>

        <div className="fixed w-[375px] bottom-0 px-[20px] pt-[10px] pb-[20px] flex justify-between items-center gap-[7px] bg-white">
          <Button
            className="rounded-[14px] bg-primary-100 h-[56px] text-primary-700 hover:bg-primary-200"
            onClick={() => router.push("/vote-progress/edit")}
          >
            재투표 하기
          </Button>
          <Button
            className="rounded-[14px] h-[56px]"
            onClick={passwordSheet.onOpen}
          >
            투표 마감하기
          </Button>
        </div>

        <PasswordInputSheet
          title="투표 마감하기 비밀번호 입력"
          subTitle="비밀번호는 모임을 만든 사람이 알고있어요"
          isOpen={passwordSheet.isOpen}
          onInteractOutside={passwordSheet.onClose}
          onPasswordComplete={(result) => {
            handlePassword(result);
          }}
        />
      </div>
    </Suspense>
  );
};

export default VoteProgressPage;
