"use client";

import {
  VoteCastResultDto,
  VoteResultByScheduleResponseDto,
} from "@/apis/vote/types/dto";
import { useCastVote } from "@/apis/vote/VoteApi.mutation";
import {
  useGetUserVoteResultQuery,
  useGetVotesQuery,
} from "@/apis/vote/VoteApi.query";
import { ColumnsType } from "@/app/edit-course/_components/DragAndDropArea";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import { useToast } from "@/components/common/Toast/use-toast";
import EditOptionArea from "@/components/common/Vote/EditOptionArea";
import useRoomUid from "@/hooks/useRoomUid";
import useUserUid from "@/hooks/useUserUid";
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
  const userUid = useUserUid();
  const toast = useToast();

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
    data: userVoteData,
    isLoading: isUserVoteDataLoading,
    isError: isUserVoteDataError,
  } = useGetUserVoteResultQuery({
    variables: {
      roomUid: roomUid ?? "",
      userUid: userUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const { mutate: castVote, isPending } = useCastVote({
    options: {
      onSuccess: (data) => {
        console.log("onSuccess", data);
        toast.toast({
          title: "투표가 수정되었습니다.",
          duration: 2000,
        });

        router.back();
      },
      onError: (error) => {
        console.log("onError", error);
        toast.toast({
          title: "투표 수정을 실패했습니다.",
          duration: 2000,
        });
      },
    },
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

  const userVotedPlaceIds = useMemo(
    () => userVoteData?.data.places.map((p) => p.placeId) ?? [],
    [userVoteData?.data.places]
  );

  const handleClickConfirm = () => {
    castVote({
      roomUid: roomUid ?? "",
      payload: {
        userUid: userUid ?? "",
        votes: Object.values(selectedPlaces).map((placeId) => ({
          placeId: Number(placeId),
          voteResult: "AGREE" as VoteCastResultDto,
        })),
      },
    });
  };

  useEffect(() => {
    if (votedSchedules) {
      setSelectedSchedule(votedSchedules[0]);
      setSelectedPlaces(
        votedSchedules.reduce((acc, { scheduleId, places }) => {
          const selectedPlaceId =
            places
              .map((p) => p.placeId)
              .filter((id) => id in userVotedPlaceIds)[0] ?? places[0].placeId;

          acc[scheduleId] = selectedPlaceId;
          return acc;
        }, {} as Record<number, number>)
      );
    }
  }, [userVotedPlaceIds, votedSchedules]);

  if (
    !isClient ||
    isVoteDataLoading ||
    isUserVoteDataLoading ||
    isVoteDataError ||
    isUserVoteDataError ||
    !voteData ||
    !userVoteData ||
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
          <button onClick={handleClickConfirm} disabled={isPending}>
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
