import Axios, { AxiosInstance, AxiosResponse } from "axios";

function returnAxiosInstance(): AxiosInstance {
  return Axios.create({
    baseURL: "https://api.open-meteo.com/v1",
    timeout: 3000,
    // headers: {
    //   "api-key": "secretAPIKEY",
    // },
  });
}

export function getAPI(urlPath: string): Promise<AxiosResponse<any>> {
  const axios = returnAxiosInstance();
  return axios.get(urlPath);
}
