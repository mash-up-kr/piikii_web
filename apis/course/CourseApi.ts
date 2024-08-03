import { AxiosInstance } from "axios";
import instance from "../instance";
import { SuccessCourseExistenceResponse } from "./types/model";
import { CheckCourseExistenceRequest } from "./types/dto";

export class CourseApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  checkCourses = async (
    roomUid: CheckCourseExistenceRequest
  ): Promise<SuccessCourseExistenceResponse> => {
    const { data } = await this.axios({
      method: "GET",
      url: `rooms/${roomUid}/courses/existence`,
    });
    return data;
  };
}

const courseApi = new CourseApi();

export default courseApi;
