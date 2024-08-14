import { useMutation } from "@tanstack/react-query";
import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";

import roomApi from "./RoomApi";
import { Parameter } from "@/types/utility/parameter";
import { isNotNull } from "@/types/utility/is-not-null";

export const ROOM_API_MUTATION_KEY = {
  CREATE: (params?: Parameter<typeof roomApi.createRoom>) =>
    ["room-create", params].filter(isNotNull),
};

export const useCreateRoom = (
  params?: UseMutationParams<typeof roomApi.createRoom>
) => {
  return useMutation({
    mutationFn: roomApi.createRoom,
    ...params?.options,
  });
};
