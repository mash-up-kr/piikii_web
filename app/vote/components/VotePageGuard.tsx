"use client";

import {
  useGetVoteStatusQuery,
  useGetUserVoteResultQuery,
} from "@/apis/vote/VoteApi.query";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { toast, useToast } from "@/components/common/Toast/use-toast";
import useRoomUid from "@/hooks/useRoomUid";
import useUserUid from "@/hooks/useUserUid";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function VotePageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const roomUid = useRoomUid();
  const userUid = useUserUid();
  const router = useRouter();
  const toast = useToast();

  const {
    data: voteStatusData,
    isLoading: isVoteStatusLoading,
    isFetching: isVoteStatusFetching,
    isError: isVoteStatusError,
  } = useGetVoteStatusQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const {
    data: userVoteResultData,
    isLoading: isUserVoteResultDataLoading,
    isFetching: isUserVoteResultDataFetching,
    isError: isUserVoteResultError,
  } = useGetUserVoteResultQuery({
    variables: {
      roomUid: roomUid ?? "",
      userUid: userUid ?? "",
    },
    options: { enabled: !!roomUid && !!userUid },
  });

  useEffect(() => {
    if (isVoteStatusLoading || isUserVoteResultDataLoading) return;

    if (isVoteStatusError || isUserVoteResultError) {
      return router.replace(`/vote-start`);
    }

    if (voteStatusData && voteStatusData.data.voteFinished) {
      return router.replace("/vote-finish");
    }

    if (userVoteResultData && userVoteResultData.data.places.length > 0) {
      return router.replace("/vote-progress");
    }
  }, [
    isUserVoteResultDataLoading,
    isUserVoteResultError,
    isVoteStatusError,
    isVoteStatusLoading,
    router,
    toast,
    userVoteResultData,
    voteStatusData,
  ]);

  if (
    isVoteStatusLoading ||
    isUserVoteResultDataLoading ||
    isVoteStatusFetching ||
    isUserVoteResultDataFetching ||
    isVoteStatusError ||
    isUserVoteResultError ||
    (voteStatusData &&
      voteStatusData.data.voteFinished &&
      userVoteResultData &&
      userVoteResultData.data.places.length > 0)
  ) {
    return <FullScreenLoader />;
  }

  return children;
}
