export type ServiceNameType = "NHANH" | "AUTH" | "UPLOAD";
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
  },
  STAGING: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
    UPLOAD: "https://dev-online-gateway.ghn.vn",
  },
  BETA: {
    AUTH: "https://sso-v2.ghn.dev/internal",
    NHANH: "https://dev-nhanh-api.ghn.dev",
    UPLOAD: "https://dev-online-gateway.ghn.vn",
  },
  PRODUCTION: {
    AUTH: "https://sso-v2.ghn.vn/internal",
    NHANH: "https://nhanh-api.ghn.vn",
    UPLOAD: "https://online-gateway.ghn.vn",
  },
};

export const appKey: CommonType = {
  LOCAL: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  STAGING: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  BETA: "6e3132ca-8833-4db0-8a7a-3447d7a09d63",
  PRODUCTION: "efb07642-c37b-4318-8a6f-a221f64770a5",
};

export const myHost: CommonType = {
  LOCAL: "http://localhost:3002/qlcl",
  STAGING: "https://nhanh.ghn.dev/qlcl",
  BETA: "https://nhanh.ghn.vn/qlcl",
  PRODUCTION: "https://nhanh.ghn.vn/qlcl",
};
export default proxy;
