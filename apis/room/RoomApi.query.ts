import { Parameter } from "@/types/utility/parameter";
import roomApi, { RoomApi } from "./RoomApi";
import { isNotNull } from "@/types/utility/is-not-null";
import { UseQueryParams } from "@/types/tanstack-query/use-query-params";
import { useQuery } from "@tanstack/react-query";

export const ROOM_API_QUERY_KEY = {
  GET_ROOM: (params?: Parameter<typeof roomApi.readRoom>) =>
    ["room", params].filter(isNotNull),
};

export const useGetRoomQuery = (
  params: UseQueryParams<typeof roomApi.readRoom>
) => {
  const queryKey = ROOM_API_QUERY_KEY.GET_ROOM(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => roomApi.readRoom(params?.variables),
    ...params?.options,
  });
};
