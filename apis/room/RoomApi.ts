import { AxiosInstance } from "axios";
import instance from "../instance";
import { SuccessRoomResponse, SuccessSaveRoomResponse } from "./types/model";
import { RoomSaveRequestForm } from "./types/dto";

export class RoomApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  createRoom = async (
    params: RoomSaveRequestForm
  ): Promise<SuccessSaveRoomResponse> => {
    const { data } = await this.axios({
      method: "POST",
      url: `/rooms`,
      data: params,
    });
    return data;
  };

  readRoom = async (roomUid: string): Promise<SuccessRoomResponse> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/rooms/${roomUid}`,
    });
    return data;
  };
}

const roomApi = new RoomApi();

export default roomApi;
