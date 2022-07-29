import { notification } from "antd";
import { EnvType } from "@/config/proxy";

enum Environment {
  LOCAL = "LOCAL",
  STAGING = "STAGING",
  BETA = "BETA",
  PRODUCTION = "PRODUCTION",
}

export const setLocalStorage = (name: string, value: any) => {
  return localStorage.setItem(name, value);
};
export const getLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const dialog = (error: any) => {
  const { message } = error;
  notification.error({
    message,
  });
};

export const setPreviousUrl = (data: any) => {
  return localStorage.setItem("prevUrl", JSON.stringify(data));
};

export const getPreviousURL = () => {
  const prevUrlString: any = localStorage.getItem("prevUrl");
  let objPrevUrl;
  try {
    objPrevUrl = JSON.parse(prevUrlString) || {};
  } catch (e) {
    objPrevUrl = {};
  }
  return objPrevUrl;
};

export const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

export const getEnv = (): EnvType => {
  const { REACT_APP_ENV = "" } = process.env;
  switch (REACT_APP_ENV) {
    case Environment.LOCAL:
      return Environment.LOCAL;
    case Environment.STAGING:
      return Environment.STAGING;
    case Environment.BETA:
      return Environment.BETA;
    case Environment.PRODUCTION:
      return Environment.PRODUCTION;
    default:
      return Environment.LOCAL;
  }
};

export const genPagination = (
  page: number = 0,
  size: number = 10
): { offset: number; limit: number } => {
  return {
    offset: page * size,
    limit: size * 1,
  };
};

export const formatTime = "HH:mm - DD/MM/YYYY";

export const formatTimeCoundown = "MMM DD, YYYY HH:mm:ss";

export const formatTimePayload = "DD/MM/YYYY";

export const formatListRoutes = (list: any) => {
  let newList: any[] = [];
  list.forEach((item: any) => {
    const { isParent, subRoutes = [] } = item;
    if (!isParent) {
      newList = [...newList, item];
    } else {
      newList = [...newList, ...subRoutes];
    }
  });
  return newList;
};

export const genTextStatus = (status: string) => {
  switch (status) {
    case "CANCELLED":
      return "Đã huỷ";
    case "SUCCESS":
      return "Đã nạp ví";
    case "WAITING":
      return "Đang chờ";
    default:
      return status;
  }
};

export const denominationsList = [
  {
    name: "Gói nạp 1 triệu",
    background: "#1a8331",
    amount: 1000000,
    coinsPackage: "P1M",
  },
  {
    name: "Gói nạp 3 triệu",
    background: "#9c00f8",
    amount: 3000000,
    coinsPackage: "P3M",
  },
  {
    name: "Gói nạp 8 triệu",
    background: "#ffa510",
    amount: 8000000,
    coinsPackage: "P8M",
  },
  {
    name: "Gói nạp 15 triệu tặng thêm 300,000 xu",
    background: "#ff0053",
    amount: 15000000,
    endow: "2%",
    endowAmount: 300000,
    coinsPackage: "P15M",
  },
];

export const weekdays = [
  {
    value: "ALL",
    label: "Hàng ngày",
  },
  {
    value: "MON",
    label: "Thứ 2",
  },
  {
    value: "TUE",
    label: "Thứ 3",
  },
  {
    value: "WED",
    label: "Thứ 4",
  },
  {
    value: "THU",
    label: "Thứ 5",
  },
  {
    value: "FRI",
    label: "Thứ 6",
  },
  {
    value: "SAT",
    label: "Thứ 7",
  },
  {
    value: "SUN",
    label: "Chủ nhật",
  },
];

export const convertStatusToNumber = (status: string) => {
  switch (status) {
    case "NEW":
      return 0;
    case "ON_TRIP":
      return 1;
    case "FINISHED":
      return 2;
    case "CANCELLED":
      return 3;
    default:
      return 0;
  }
};

export const convertIsReadyToNumber = (value: string) => {
  switch (value) {
    case undefined:
      return 0;
    case "true":
      return 1;
    case "false":
      return 2;
    default:
      return 0;
  }
};
