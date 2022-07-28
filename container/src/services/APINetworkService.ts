import axios, { AxiosRequestConfig, AxiosInstance, Method } from "axios";
import proxy, { ServiceNameType } from "@/config/proxy";
import { getLocalStorage, getEnv, getKeyValue } from "@/utils/utils";

const ENV = getEnv();

interface Request {
  url: string;
  method?: Method;
  data?: any;
  serviceName?: ServiceNameType;
}

const configuredAxios = (serviceName: ServiceNameType): AxiosInstance => {
  const proxyByEnv = proxy[ENV];

  const baseURL = getKeyValue(proxyByEnv)(serviceName);

  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL,
    headers: {
      "content-type": "application/json",
    },
  };
  return axios.create(axiosRequestConfig);
};

const request = async ({
  url = "",
  method = "post",
  data,
  serviceName = "NHANH",
}: Request) => {
  const instance = configuredAxios(serviceName);

  instance.interceptors.request.use((config) => {
    const prefix = serviceName === "HUB" ? "Basic" : "Bearer";
    let token = getLocalStorage("SESSION");
    if (serviceName === "HUB") {
      token =
        "YXBwcy1mcm9udGVuZDphTTJvTHE1MGFzZHdlaWxpc2hkamtyZW9oanNkamZzaGtqc2h3cndwZnNjc3ZnMw==";
    }
    config.headers = {
      ...config.headers,
      Authorization: token ? `${prefix} ${token}` : "",
    };
    return config;
  });

  instance.interceptors.response.use(
    (config) => config,
    async (error) => {
      // ****** handle refresh token here ⬇️  *********
      // const originalRequest = error.config;
      // if (error.response.status === 401) {
      //   const newToken = await refreshToken();
      //   originalRequest.headers['Authorization'] = newToken;
      //   return instance(originalRequest);
      // }
      return Promise.reject(error);
    }
  );

  let rs = {};

  await instance({ method, url, data })
    .then((response: any) => {
      rs = response?.data;
    })
    .catch((reason: any) => {
      rs = reason?.response?.data;
    });

  return rs;
};

export default request;
