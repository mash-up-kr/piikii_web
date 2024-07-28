import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError) => {
    try {
      return Promise.reject(error);
    } catch (e) {
      Promise.reject(e);
    }
  }
);

export default instance;
