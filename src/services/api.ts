import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store";
import { IApiResponse } from "../interfaces";

class ApiService {
  public async get(url: string, config: AxiosRequestConfig = {}): Promise<IApiResponse> {
    const server = store.getters["network/server"];

    const response = await axios.get(`${server}/${url}`, config);

    if (response.data.error) {
      return Promise.reject(new Error(`Error GET ${url} : ${JSON.stringify(response)}`));
    }

    return response.data;
  }

  public async post(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<IApiResponse> {
    if (!config.headers) {
      config.headers = {
        "Content-Type": "application/json",
      };
    }

    const server = store.getters["network/server"];

    const response = await axios.post(`${server}/${url}`, data, config);

    if (response.data.error) {
      return Promise.reject(new Error(`Error POST ${url} : ${JSON.stringify(response)}`));
    }

    return response.data;
  }
}

export default new ApiService();
