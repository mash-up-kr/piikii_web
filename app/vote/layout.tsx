"use client";

import {
  useGetVotesQuery,
  useGetVoteStatusQuery,
} from "@/apis/vote/VoteApi.query";
import useRoomUid from "@/hooks/useRoomUid";

export default function Layout({ children }: { children: React.ReactNode }) {
  const roomUid = useRoomUid();

  const { data, error, isSuccess, isError } = useGetVoteStatusQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const { data: votesData } = useGetVotesQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  return children;
}
