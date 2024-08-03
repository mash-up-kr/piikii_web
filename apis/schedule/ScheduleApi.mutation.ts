import { useMutation } from "@tanstack/react-query";
import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";

import scheduleApi from "./ScheduleApi";
import { Parameter } from "@/types/utility/parameter";
import { isNotNull } from "@/types/utility/is-not-null";

export const SCHEDULES_API_MUTATION_KEY = {
  CREATE: (params?: Parameter<typeof scheduleApi.createSchedules>) =>
    ["schedules-create", params].filter(isNotNull),
};


export const useCreateSchedules = (
  params?: UseMutationParams<typeof scheduleApi.createSchedules>
) => {
  return useMutation({
    mutationFn: scheduleApi.createSchedules,
    ...params?.options,
  });
};
