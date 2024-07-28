import { AxiosInstance } from "axios";
import instance from "../instance";
import { RegisterSchedulesRequest } from "./types/dto";
import { ResponseForm } from "./types/model";

export class ScheduleApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 스케줄을 추가/수정/삭제합니다.
  createSchedules = async (
    req: RegisterSchedulesRequest
  ): Promise<ResponseForm> => {
    const { data } = await this.axios({
      method: "PUT",
      url: `/rooms`,
      data: req,
    });
    return data;
  };
}

const scheduleApi = new ScheduleApi();

export default scheduleApi;
