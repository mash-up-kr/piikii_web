import { VOTE_API_QUERY_KEY } from "@/apis/vote/VoteApi.query";
import VotePageGuard from "./components/VotePageGuard";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import voteApi from "@/apis/vote/VoteApi";
import { getQueryClient } from "@/components/providers/getQueryClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const roomUid = cookieStore.get("roomUid");
  const userUid = cookieStore.get("userUid");

  const queryClient = getQueryClient();

  if (roomUid?.value) {
    queryClient.prefetchQuery({
      queryKey: VOTE_API_QUERY_KEY.GET_VOTE_STATUS({
        roomUid: roomUid.value,
      }),
      queryFn: () => voteApi.getVoteStatus({ roomUid: roomUid.value }),
    });
  }

  if (roomUid?.value && userUid?.value) {
    queryClient.prefetchQuery({
      queryKey: VOTE_API_QUERY_KEY.GET_USER_VOTE_RESULT({
        roomUid: roomUid.value,
        userUid: userUid.value,
      }),
      queryFn: () =>
        voteApi.getUserVoteResult({
          roomUid: roomUid.value,
          userUid: userUid.value,
        }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VotePageGuard>{children}</VotePageGuard>
    </HydrationBoundary>
  );
}
