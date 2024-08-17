import { AxiosInstance } from "axios";
import instance from "../instance";
import { SuccessCourseExistenceResponse } from "./types/model";
import { CheckCourseExistenceRequest, CourseResponseDto } from "./types/dto";
import { ResponseForm } from "../common/model";

export class CourseApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCourses = async (
    roomUid: string
  ): Promise<ResponseForm<CourseResponseDto>> => {
    const { data } = await this.axios({
      method: "GET",
      url: `rooms/${roomUid}/course`,
    });
    return data;
  };

  checkCourses = async (
    roomUid: string
  ): Promise<SuccessCourseExistenceResponse> => {
    const { data } = await this.axios({
      method: "GET",
      url: `rooms/${roomUid}/course/existence`,
    });
    return data;
  };

  patchCoursePlace = async ({
    roomUid,
    placeId,
  }: {
    roomUid: string;
    placeId: number;
  }) => {
    const { data } = await this.axios({
      method: "PATCH",
      url: `rooms/${roomUid}/course/place/${placeId}`,
    });
    return data;
  };
}

const courseApi = new CourseApi();

export default courseApi;
