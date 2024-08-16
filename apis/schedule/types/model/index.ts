export type ResponseForm = {
  data: {};
  timestamp: number;
};

export type ScheduleResponse = {
  scheduleId?: number | null;
  name: string;
  sequence: number;
  type: "ARCADE" | "DISH" | "DESSERT" | "ALCOHOL";
};

export type SchedulesResponse = {
  schedules: ScheduleResponse[];
};

export type SuccessSchedulesResponse = {
  data: SchedulesResponse;
  timestamp: number;
};

export const ScheduleResponseStringMap = {
  ARCADE: "놀거리",
  DISH: "식당",
  DESSERT: "카페 ",
  ALCOHOL: "술",
};
