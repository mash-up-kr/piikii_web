import { Parameter } from "@/types/utility/parameter";
import placeApi from "./PlaceApi";
import { isNotNull } from "@/types/utility/is-not-null";
import { UseQueryParams } from "@/types/tanstack-query/use-query-params";
import { useQuery } from "@tanstack/react-query";

export const PLACE_API_QUERY_KEY = {
  GET_PLACES: (params: Parameter<typeof placeApi.getPlaces>) =>
    ["places", params.roomUid].filter(isNotNull),
};

export const useGetPlacesQuery = (
  params: UseQueryParams<typeof placeApi.getPlaces>
) => {
  const queryKey = PLACE_API_QUERY_KEY.GET_PLACES(params.variables);
  const query = useQuery({
    queryKey,
    queryFn: () => placeApi.getPlaces(params.variables),
    ...params?.options,
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
