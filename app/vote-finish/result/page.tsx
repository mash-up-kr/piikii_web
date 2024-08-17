"use client";

import React, { useEffect, useMemo } from "react";

import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import ResultArea from "@/components/common/Vote/ResultArea";
import { useRouter } from "next/navigation";
import { useGetVotesQuery } from "@/apis/vote/VoteApi.query";
import { VoteResultByScheduleResponseDto } from "@/apis/vote/types/dto";
import useRoomUid from "@/hooks/useRoomUid";
import { useIsClient } from "usehooks-ts";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { useGetRoomQuery } from "@/apis/room/RoomApi.query";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const VoteResult = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const roomUid = useRoomUid();

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

  const [selectedSchedule, setSelectedSchedule] =
    React.useState<VoteResultByScheduleResponseDto>();

  const votedSchedules = useMemo(
    () => voteData?.data.result ?? [],
    [voteData?.data.result]
  );

  useEffect(() => {
    if (votedSchedules) {
      setSelectedSchedule(votedSchedules[0]);
    }
  }, [votedSchedules]);

  if (
    !isClient ||
    isRoomDataLoading ||
    isVoteDataLoading ||
    isRoomDataError ||
    isVoteDataError ||
    !roomData ||
    !voteData ||
    !selectedSchedule
  )
    return <FullScreenLoader />;

  return (
    <div className="relative">
      <NavigationBar
        className="pl-[12px]"
        leftSlot={
          <div className="flex justify-start items-center">
            <button className="flex justify-center items-center">
              <Image
                src={"/svg/ic_chevron_left_black.svg"}
                alt="wrap"
                width={24}
                height={24}
                onClick={() => router.back()}
              />
            </button>
            <span className="pl-[4px] text-semibold-15 text-neutral-700">
              투표 결과
            </span>
          </div>
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
            {dayjs(roomData.data.voteDeadline)
              .locale("ko")
              .format("DD일 dddd A h시 mm분")}
            에 마감된 투표입니다
          </p>
        </div>

        <div className="pt-[33px] px-[20px]">
          <Title
            title={<span>투표 결과를 공개할께요</span>}
            subtitle={<span>6명이 참여했어요</span>}
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
    </div>
  );
};

export default VoteResult;
