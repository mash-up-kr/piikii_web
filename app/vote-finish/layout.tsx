import courseApi from "@/apis/course/CourseApi";
import { COURSE_API_QUERY_KEY } from "@/apis/course/CourseApi.query";
import voteApi from "@/apis/vote/VoteApi";
import { VOTE_API_QUERY_KEY } from "@/apis/vote/VoteApi.query";
import { getQueryClient } from "@/components/providers/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import VoteFinishGuard from "./_components/VoteFinishGuard";

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

    queryClient.prefetchQuery({
      queryKey: COURSE_API_QUERY_KEY.GET_COURSE_EXISTENCE(roomUid.value),
      queryFn: () => courseApi.checkCourses(roomUid.value),
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

  // NOTE: 잠시 테스트로 주석처리
  // if (courseExistenceData && !courseExistenceData.data.isExist)
  //   return <FullScreenLoader label={`가장 적합한 코스를\n만들고 있어요`} />;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VoteFinishGuard>{children}</VoteFinishGuard>
    </HydrationBoundary>
  );
}
