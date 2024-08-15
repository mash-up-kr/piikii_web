import { Parameter } from "@/types/utility/parameter";
import { isNotNull } from "@/types/utility/is-not-null";
import { UseQueryParams } from "@/types/tanstack-query/use-query-params";
import { useQuery } from "@tanstack/react-query";
import scheduleApi from "./ScheduleApi";

export const SCHEDULE_API_QUERY_KEY = {
  GET_SCHEDULES: (params?: Parameter<typeof scheduleApi.readSchedules>) =>
    ["schedules", params].filter(isNotNull),
};

export const useGetSchedulesQuery = (
  params: UseQueryParams<typeof scheduleApi.readSchedules>
) => {
  const queryKey = SCHEDULE_API_QUERY_KEY.GET_SCHEDULES(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => scheduleApi.readSchedules(params?.variables),
    ...params?.options,
  });
};
