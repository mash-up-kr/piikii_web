import { AxiosInstance } from "axios";
import instance from "../instance";
import { RegisterSchedulesRequest } from "./types/dto";
import { ResponseForm, SuccessSchedulesResponse } from "./types/model";

export class ScheduleApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  readSchedules = async (
    roomUid: string
  ): Promise<SuccessSchedulesResponse> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/rooms/${roomUid}/schedules`,
    });
    return data;
  };

  // 스케줄을 추가/수정/삭제합니다.
  createSchedules = async (
    params: RegisterSchedulesRequest
  ): Promise<ResponseForm> => {
    const { roomUid, schedules } = params;
    const { data } = await this.axios({
      method: "PUT",
      url: `/rooms/${roomUid}/schedules`,
      data: { schedules },
    });
    return data;
  };
}

const scheduleApi = new ScheduleApi();

export default scheduleApi;
