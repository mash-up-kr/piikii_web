"use client";

import { useUpdateCoursePlace } from "@/apis/course/CourseApi.mutation";
import {
  COURSE_API_QUERY_KEY,
  useGetCourseQuery,
} from "@/apis/course/CourseApi.query";
import {
  PLACE_API_QUERY_KEY,
  useGetPlacesQuery,
} from "@/apis/place/PlaceApi.query";
import { VoteResultByScheduleResponseDto } from "@/apis/vote/types/dto";
import { useGetVotesQuery } from "@/apis/vote/VoteApi.query";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import { useToast } from "@/components/common/Toast/use-toast";
import EditOptionArea from "@/components/common/Vote/EditOptionArea";
import useRoomUid from "@/hooks/useRoomUid";
import useUserUid from "@/hooks/useUserUid";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useIsClient } from "usehooks-ts";

export default function VoteEditPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const roomUid = useRoomUid();
  const toast = useToast();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const searchParamsScheduleId = useMemo(
    () => searchParams.get("scheduleId"),
    [searchParams]
  );

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

  const {
    data: courseData,
    isLoading: isCourseDataLoading,
    isError: isCourseDataError,
  } = useGetCourseQuery({
    variables: roomUid ?? "",
    options: { enabled: !!roomUid },
  });

  const { mutate: updateCourse } = useUpdateCoursePlace({
    options: {
      onSuccess: () => {
        roomUid &&
          queryClient.invalidateQueries({
            queryKey: COURSE_API_QUERY_KEY.GET_COURSE(roomUid),
          });
      },
      onError: () => {
        toast.toast({
          title: "코스 수정에 실패했습니다.",
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

  const confirmedPlaces = useMemo(
    () => courseData?.data.places.map((place) => place.placeId) ?? [],
    [courseData]
  );

  const handleClickConfirm = () => {
    Object.values(selectedPlaces).forEach((placeId) => {
      updateCourse(
        {
          roomUid: roomUid ?? "",
          placeId,
        },
        {
          onSuccess: () => {
            toast.toast({
              title: "코스가 수정되었습니다.",
            });
            router.push("/vote-finish");
          },
        }
      );
    });
  };

  useEffect(() => {
    if (votedSchedules) {
      setSelectedSchedule(() =>
        searchParamsScheduleId
          ? votedSchedules.find(
              (v) => v.scheduleId === Number(searchParamsScheduleId)
            )
          : votedSchedules[0]
      );
    }
  }, [searchParamsScheduleId, votedSchedules]);

  useEffect(() => {
    if (votedSchedules && courseData) {
      setSelectedPlaces(
        courseData?.data.places.reduce((acc, { placeId, scheduleId }) => {
          acc[scheduleId] = placeId;
          return acc;
        }, {} as Record<number, number>)
      );
    }
  }, [courseData, votedSchedules]);

  if (
    !isClient ||
    isVoteDataLoading ||
    isPlaceDataLoading ||
    isVoteDataError ||
    isPlaceDataError ||
    !placeData ||
    !voteData ||
    !selectedSchedule
  )
    return (
      <Suspense>
        <FullScreenLoader />
      </Suspense>
    );

  return (
    <Suspense>
      <div>
        <NavigationBar
          title="코스 수정하기"
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
            <button onClick={handleClickConfirm}>
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
              router.push(`/vote-finish/edit?scheduleId=${scheduleId}`);
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
    </Suspense>
  );
}
