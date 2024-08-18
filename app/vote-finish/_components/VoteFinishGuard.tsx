"use client";

import { useGetCourseExistenceQuery } from "@/apis/course/CourseApi.query";
import {
  useGetVoteStatusQuery,
  useGetUserVoteResultQuery,
} from "@/apis/vote/VoteApi.query";
import useRoomUid from "@/hooks/useRoomUid";
import useUserUid from "@/hooks/useUserUid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VoteFinishGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const roomUid = useRoomUid();
  const userUid = useUserUid();

  const {
    data: voteStatusData,
    isLoading: isVoteStatusLoading,
    isError: isVoteStatusError,
  } = useGetVoteStatusQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const {
    data: userVoteResultData,
    isLoading: isUserVoteResultLoading,
    isError: isUserVoteResultError,
  } = useGetUserVoteResultQuery({
    variables: {
      roomUid: roomUid ?? "",
      userUid: userUid ?? "",
    },
    options: { enabled: !!roomUid && !!userUid },
  });

  const {
    data: courseExistenceData,
    isLoading: isCourseExistenceLoading,
    isError: isCourseExistenceError,
  } = useGetCourseExistenceQuery({
    variables: roomUid ?? "",
    options: { enabled: !!roomUid },
  });

  useEffect(() => {
    if (
      isVoteStatusLoading ||
      isUserVoteResultLoading ||
      isCourseExistenceLoading
    )
      return;

    if (
      !voteStatusData ||
      !userVoteResultData ||
      !courseExistenceData ||
      isVoteStatusError ||
      isUserVoteResultError ||
      isCourseExistenceError
    ) {
      return router.replace("/vote");
    }

    if (voteStatusData && !voteStatusData.data.voteFinished) {
      return router.replace("/vote-progress");
    }
  }, [
    courseExistenceData,
    isCourseExistenceError,
    isCourseExistenceLoading,
    isUserVoteResultError,
    isUserVoteResultLoading,
    isVoteStatusError,
    isVoteStatusLoading,
    router,
    userVoteResultData,
    voteStatusData,
  ]);

  // NOTE: 잠시 테스트로 주석처리
  // if (courseExistenceData && !courseExistenceData.data.isExist)
  //   return <FullScreenLoader label={`가장 적합한 코스를\n만들고 있어요`} />;

  return children;
}
