export type ResponseForm = {
  data: {};
  timestamp: number;
};

export type ScheduleResponse = {
  scheduleId: number;
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
