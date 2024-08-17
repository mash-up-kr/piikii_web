import { UseMutationParams } from "@/types/tanstack-query/use-mutation-params";
import { useMutation } from "@tanstack/react-query";
import courseApi from "./CourseApi";

export const useUpdateCoursePlace = (
  params: UseMutationParams<typeof courseApi.patchCoursePlace>
) => {
  return useMutation({
    mutationFn: courseApi.patchCoursePlace,
    ...params?.options,
  });
};
