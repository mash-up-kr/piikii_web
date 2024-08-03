export type CourseExistenceResponse = {
  isExist: boolean;
};

export type SuccessCourseExistenceResponse = {
  data: CourseExistenceResponse;
  timestamp: number;
};
