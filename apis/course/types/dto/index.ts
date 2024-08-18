export type CheckCourseExistenceRequest = {
  roomUid: string;
};

export type CourseResponseDto = {
  roomName: string;
  places: CoursePlaceResponseDto[];
};

export type CoursePlaceResponseDto = {
  scheduleId: number;
  scheduleType: "ARCADE" | "DISH" | "DESSERT" | "ALCOHOL";
  placeId: number;
  name: string;
  url: string;
  address: string;
  phoneNumber: string;
  distance: number;
  time: number;
};
