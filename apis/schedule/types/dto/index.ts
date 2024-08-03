export type RegisterScheduleRequest = {
  scheduleId?: number;
  name: string;
  type: string; // ARCADE, DISH, DESSERT, ALCOHOL
  sequence: number;
};

export type RegisterSchedulesRequest = {
  roomUid:string;
  schedules: RegisterScheduleRequest[];
};
