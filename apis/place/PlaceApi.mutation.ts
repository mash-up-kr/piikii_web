import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";
import placeApi from "./PlaceApi";
import { useMutation } from "@tanstack/react-query";

export const useCreatePlace = (
  params: UseMutationParams<typeof placeApi.createPlace>
) => {
  return useMutation({
    mutationFn: placeApi.createPlace,
    ...params?.options,
  });
};

export const useUpdatePlace = (
  params: UseMutationParams<typeof placeApi.updatePlace>
) => {
  return useMutation({
    mutationFn: placeApi.updatePlace,
    ...params?.options,
  });
};

export const useDeletePlace = (
  params: UseMutationParams<typeof placeApi.deletePlace>
) => {
  return useMutation({
    mutationFn: placeApi.deletePlace,
    ...params?.options,
  });
};
