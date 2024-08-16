"use client";

import { VoteResultByScheduleResponseDto } from "@/apis/vote/types/dto";
import { useGetVotesQuery } from "@/apis/vote/VoteApi.query";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import EditOptionArea from "@/components/common/Vote/EditOptionArea";
import useRoomUid from "@/hooks/useRoomUid";
import { CardInfoProps } from "@/model";
import { set } from "lodash-es";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useIsClient } from "usehooks-ts";

export default function VoteEditPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const roomUid = useRoomUid();

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
    useState<VoteResultByScheduleResponseDto>();

  const [selectedPlaces, setSelectedPlaces] = useState<Record<number, number>>(
    {}
  );

  const votedSchedules = useMemo(
    () => voteData?.data.result,
    [voteData?.data.result]
  );

  useEffect(() => {
    if (votedSchedules) {
      setSelectedSchedule(votedSchedules[0]);
      setSelectedPlaces(
        votedSchedules.reduce((acc, { scheduleId, places }) => {
          acc[scheduleId] = places[0].placeId;
          return acc;
        }, {} as Record<number, number>)
      );
    }
  }, [votedSchedules]);

  if (
    !isClient ||
    isVoteDataLoading ||
    isVoteDataError ||
    !voteData ||
    !selectedSchedule
  )
    return <FullScreenLoader />;

  return (
    <div>
      <NavigationBar
        title="재투표 하기"
        leftSlot={
          <button
            className="flex justify-center items-center"
            onClick={() => router.back()}
          >
            <Image
              src="/svg/ic_chevron_left_black.svg"
              width={24}
              height={24}
              alt="left-chevron"
            />
          </button>
        }
        rightSlot={
          <button>
            <span className="text-bold-15 text-primary-700">완료</span>
          </button>
        }
        className="pl-[12px] pr-[20px]"
      />

      <div className="pt-[56px]">
        <EditOptionArea
          schedules={
            votedSchedules?.map(({ scheduleId, scheduleName }) => ({
              scheduleId,
              scheduleName,
            })) ?? []
          }
          selectedSchedule={selectedSchedule}
          selectedPlaces={selectedPlaces}
          onClickSchedule={(scheduleId) => {
            setSelectedSchedule(
              votedSchedules?.find((v) => v.scheduleId === scheduleId)
            );
          }}
          onClickPlaceCard={(scheduleId, placeId) => {
            setSelectedPlaces((prev) => ({
              ...prev,
              [scheduleId]: placeId,
            }));
          }}
        />
      </div>
    </div>
  );
}
