export type RegisterScheduleRequest = {
  scheduleId?: number;
  name: string;
  type: string;
  // ARCADE, DISH, DESSERT, ALCOHOL, ARCADE, DISH, DESSERT, ALCOHOL
  sequence: number;
};

export type RegisterSchedulesRequest = {
  schedules: RegisterScheduleRequest[];
};
