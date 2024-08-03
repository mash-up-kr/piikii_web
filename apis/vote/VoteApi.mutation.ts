import { Parameter } from "@/types/utility/parameter";
import voteApi from "./VoteApi";
import { isNotNull } from "@/types/utility/is-not-null";
import { useMutation } from "@tanstack/react-query";
import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";

// export const VOTE_API_MUTATION_KEY = {
//   CAST_VOTE: (params?: Parameter<typeof voteApi.postVote>) =>
//     ["vote", params].filter(isNotNull),
//   UPDATE_VOTE_DEADLINE: (params?: Parameter<typeof voteApi.patchVoteDeadline>) =>
//     ["room-create", params].filter(isNotNull),
// };

export const useCastVote = (
  params?: UseMutationParams<typeof voteApi.postVote>
) => {
  return useMutation({
    mutationFn: voteApi.postVote,
    ...params?.options,
  });
};

export const useUpdateVoteDeadline = (
  params?: UseMutationParams<typeof voteApi.patchVoteDeadline>
) => {
  return useMutation({
    mutationFn: voteApi.patchVoteDeadline,
    ...params?.options,
  });
};
