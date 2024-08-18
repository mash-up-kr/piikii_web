"use client";

import {
  useGetUserVoteResultQuery,
  useGetVoteStatusQuery,
} from "@/apis/vote/VoteApi.query";
import useRoomUid from "@/hooks/useRoomUid";
import useUserUid from "@/hooks/useUserUid";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function VoteProgressGuard({
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

  useEffect(() => {
    if (isVoteStatusLoading || isUserVoteResultLoading) return;

    if (
      !voteStatusData ||
      !userVoteResultData ||
      isVoteStatusError ||
      isUserVoteResultError
    ) {
      return router.replace("/vote");
    }

    if (voteStatusData && voteStatusData.data.voteFinished) {
      return router.replace("/vote-finish");
    }
  }, [
    isUserVoteResultError,
    isUserVoteResultLoading,
    isVoteStatusError,
    isVoteStatusLoading,
    router,
    userVoteResultData,
    voteStatusData,
  ]);

  return children;
}
