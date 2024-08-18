"use client";

import {
  useGetVoteStatusQuery,
  useGetUserVoteResultQuery,
} from "@/apis/vote/VoteApi.query";
import FullScreenLoader from "@/components/common/FullScreenLoader";
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

  const {
    data: voteStatusData,
    isLoading: isVoteStatusLoading,
    isFetching: isVoteStatusFetching,
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
  } = useGetUserVoteResultQuery({
    variables: {
      roomUid: roomUid ?? "",
      userUid: userUid ?? "",
    },
    options: { enabled: !!roomUid && !!userUid },
  });

  useEffect(() => {
    if (isVoteStatusLoading || isUserVoteResultDataLoading) return;

    if (voteStatusData && voteStatusData.data.voteFinished) {
      return router.replace("/vote-finish");
    }

    if (userVoteResultData && userVoteResultData.data.places.length > 0) {
      return router.replace("/vote-progress");
    }
  }, [
    isUserVoteResultDataLoading,
    isVoteStatusLoading,
    router,
    userVoteResultData,
    voteStatusData,
  ]);

  if (
    isVoteStatusLoading ||
    isUserVoteResultDataLoading ||
    isVoteStatusFetching ||
    isUserVoteResultDataFetching ||
    (voteStatusData &&
      voteStatusData.data.voteFinished &&
      userVoteResultData &&
      userVoteResultData.data.places.length > 0)
  ) {
    return <FullScreenLoader />;
  }

  return children;
}
