import { Parameter } from "@/types/utility/parameter";
import { isNotNull } from "@/types/utility/is-not-null";
import { UseQueryParams } from "@/types/tanstack-query/use-query-params";
import { useQuery } from "@tanstack/react-query";
import courseApi from "./CourseApi";

export const COURSE_API_QUERY_KEY = {
  GET_COURSE: (params?: Parameter<typeof courseApi.getCourses>) =>
    ["course", params].filter(isNotNull),
  GET_COURSE_EXISTENCE: (params?: Parameter<typeof courseApi.checkCourses>) =>
    ["course", "existence", params].filter(isNotNull),
};

export const useGetCourseQuery = (
  params: UseQueryParams<typeof courseApi.getCourses>
) => {
  const queryKey = COURSE_API_QUERY_KEY.GET_COURSE(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => courseApi.getCourses(params?.variables),
    ...params?.options,
  });
};

export const useGetCourseExistenceQuery = (
  params: UseQueryParams<typeof courseApi.checkCourses>
) => {
  const queryKey = COURSE_API_QUERY_KEY.GET_COURSE_EXISTENCE(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => courseApi.checkCourses(params?.variables),
    ...params?.options,
  });
};
