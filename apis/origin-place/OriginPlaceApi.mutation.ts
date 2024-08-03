import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";
import { useMutation } from "@tanstack/react-query";
import originPlaceApi from "./OriginPlaceApi";

export const useCreatePlace = (
  params: UseMutationParams<typeof originPlaceApi.postOriginPlace>
) => {
  return useMutation({
    mutationFn: originPlaceApi.postOriginPlace,
    ...params?.options,
  });
};
