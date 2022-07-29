export type ServiceNameType = "NHANH" | "AUTH";
export type EnvType = "LOCAL" | "STAGING" | "BETA" | "PRODUCTION";

type ProxyType = {
  [key in EnvType]: {
    [key in ServiceNameType]: string;
  };
};

type CommonType = {
  [key in EnvType]: string;
};

const proxy: ProxyType = {
  LOCAL: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
  },
  STAGING: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
  },
  BETA: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
  },
  PRODUCTION: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
  },
};

export const appKey: CommonType = {
  LOCAL: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  STAGING: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  BETA: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  PRODUCTION: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
};

export const myHost: CommonType = {
  LOCAL: "http://localhost:3001/giao-lay-tra",
  STAGING: "https://nhanh.ghn.dev/giao-lay-tra",
  BETA: "https://nhanh.ghn.vn/giao-lay-tra",
  PRODUCTION: "https://nhanh.ghn.vn/giao-lay-tra",
};
export default proxy;
