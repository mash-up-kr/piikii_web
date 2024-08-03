import { AxiosInstance } from "axios";
import instance from "../instance";
import { PlaceAutoCompleteUrlRequest } from "./types/model";
import { PlaceAutoCompleteResponse } from "./types/dto";

export class OriginPlaceApi {
  axios: AxiosInstance = instance;

  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  postOriginPlace = async (
    url: PlaceAutoCompleteUrlRequest
  ): Promise<PlaceAutoCompleteResponse> => {
    const { data } = await this.axios.post<PlaceAutoCompleteResponse>(
      `place/auto-complete/url`,
      url
    );
    return data;
  };
}

const originPlaceApi = new OriginPlaceApi();

export default originPlaceApi;
