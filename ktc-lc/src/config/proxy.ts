export type ServiceNameType = "NHANH" | "AUTH" | "UPLOAD" | "HUB";
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
    UPLOAD: "https://dev-online-gateway.ghn.vn",
    HUB: "https://hub-stg-api.ghn.dev",
  },
  STAGING: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
    UPLOAD: "https://dev-online-gateway.ghn.vn",
    HUB: "https://hub-stg-api.ghn.dev",
  },
  BETA: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
    UPLOAD: "https://dev-online-gateway.ghn.vn",
    HUB: "https://hub-stg-api.ghn.dev",
  },
  PRODUCTION: {
    AUTH: "https://sso-v2.ghn.vn/internal",
    NHANH: "https://nhanh-api.ghn.vn",
    UPLOAD: "https://online-gateway.ghn.vn",
    HUB: "https://hub-stg-api.ghn.dev",
  },
};

export const appKey: CommonType = {
  LOCAL: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  STAGING: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  BETA: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  PRODUCTION: "efb07642-c37b-4318-8a6f-a221f64770a5",
};

export const myHost: CommonType = {
  LOCAL: "http://localhost:3003/ktc-lc",
  STAGING: "https://nhanh.ghn.dev/ktc-lc",
  BETA: "https://nhanh.ghn.vn/ktc-lc",
  PRODUCTION: "https://nhanh.ghn.vn/ktc-lc",
};
export default proxy;
