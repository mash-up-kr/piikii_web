"use client";

import { useGetVoteStatusQuery } from "@/apis/vote/VoteApi.query";
import useRoomUid from "@/hooks/useRoomUid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const roomUid = useRoomUid();

  const { data, isError } = useGetVoteStatusQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  useEffect(() => {
    if (isError) {
      return router.replace("/vote");
    }

    if (data && data.data.voteFinished) {
      return router.replace("/vote-finish");
    }
  }, [data, isError, router]);

  return <div>{children}</div>;
}
