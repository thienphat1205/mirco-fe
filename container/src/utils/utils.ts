import { notification } from "antd";
import { EnvType } from "@/config/proxy";
import { PickerLocale } from "antd/lib/date-picker/generatePicker";
import CalendarLocale from "rc-picker/lib/locale/vi_VN";
enum Environment {
  LOCAL = "LOCAL",
  STAGING = "STAGING",
  BETA = "BETA",
  PRODUCTION = "PRODUCTION",
}

interface ItemApp {
  indexApp: number;
  key: string;
  name: string;
  className: string;
  link: {
    LOCAL: string;
    STAGING: string;
    BETA: string;
    PRODUCTION: string;
  };
}

type UiAppListType = ItemApp[];

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
      return Environment.STAGING;
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

export const appList: UiAppListType = [
  {
    indexApp: 1,
    key: "giao_lay_tra",
    name: "Giao-Lấy-Trả",
    className: "app-lastmile",
    link: {
      LOCAL: "https://nhanh.ghn.dev",
      STAGING: "https://nhanh.ghn.dev",
      BETA: "https://beta-nhanh.ghn.vn",
      PRODUCTION: "https://nhanh.ghn.vn",
    },
  },
  // {
  //   indexApp: 2,
  //   key: "khach_hang_lon",
  //   name: "Kho khách hàng lớn",
  //   className: "app-megahub",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/khach-hang-lon",
  //     STAGING: "https://nhanh.ghn.dev/khach-hang-lon",
  //     BETA: "https://beta-nhanh.ghn.vn/khach-hang-lon",
  //     PRODUCTION: "https://nhanh.ghn.vn/khach-hang-lon",
  //   },
  // },
  // {
  //   indexApp: 3,
  //   key: "nhan_hang_tai_bc",
  //   name: "Nhận hàng tại BC",
  //   className: "app-station",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/gui-tra",
  //     STAGING: "https://nhanh.ghn.dev/gui-tra",
  //     BETA: "https://beta-nhanh.ghn.vn/gui-tra",
  //     PRODUCTION: "https://nhanh.ghn.vn/gui-tra",
  //   },
  // },
  {
    indexApp: 4,
    key: "ktc_van_tai",
    name: "KTC-LC",
    className: "app-inside",
    link: {
      LOCAL: "/ktc-lc",
      STAGING: "/ktc-lc",
      BETA: "/ktc-lc",
      PRODUCTION: "/ktc-lc",
    },
  },
  // {
  //   indexApp: 5,
  //   key: "quan_ly_kho_tuyen",
  //   name: "Quản lý Kho và Tuyến",
  //   className: "app-hub",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/quan-ly-kho-tuyen",
  //     STAGING: "https://nhanh.ghn.dev/quan-ly-kho-tuyen",
  //     BETA: "https://beta-nhanh.ghn.vn/quan-ly-kho-tuyen",
  //     PRODUCTION: "https://nhanh.ghn.vn/quan-ly-kho-tuyen",
  //   },
  // },
  {
    indexApp: 6,
    key: "quan_ly_chat_luong",
    name: "HT Quản Lý Chất Lượng",
    className: "app-qlcl",
    link: {
      LOCAL: "/qlcl",
      STAGING: "/qlcl",
      BETA: "/qlcl",
      PRODUCTION: "/qlcl",
    },
  },
  // {
  //   indexApp: 7,
  //   key: "vantai_dieuphoi",
  //   name: "Vận tải điều phối",
  //   className: "app-vtdp",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/vantai-dieuphoi",
  //     STAGING: "https://nhanh.ghn.dev/vantai-dieuphoi",
  //     BETA: "https://beta-nhanh.ghn.vn/vantai-dieuphoi",
  //     PRODUCTION: "https://nhanh.ghn.vn/vantai-dieuphoi",
  //   },
  // },
  // {
  //   indexApp: 8,
  //   key: "vantai_quanly",
  //   name: "Vận tải quản lý",
  //   className: "app-vtql",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/vantai-quanly",
  //     STAGING: "https://nhanh.ghn.dev/vantai-quanly",
  //     BETA: "https://beta-nhanh.ghn.vn/vantai-quanly",
  //     PRODUCTION: "https://nhanh.ghn.vn/vantai-quanly",
  //   },
  // },
  // {
  //   indexApp: 9,
  //   key: "camera",
  //   name: "Camera",
  //   className: "app-camera",
  //   link: {
  //     LOCAL: "https://nhanh.ghn.dev/camera",
  //     STAGING: "https://nhanh.ghn.dev/camera",
  //     BETA: "https://beta-nhanh.ghn.vn/camera",
  //     PRODUCTION: "https://nhanh.ghn.vn/camera",
  //   },
  // },
];

export const checkPermission = (
  permissions: Array<string> = [],
  permission: any = ""
) => {
  if (!permission) return true;
  return permissions.indexOf(permission) > -1;
};

export const genIndexByWeekday = (key: string) => {
  switch (key) {
    case "Monday":
      return 0;
    case "Tuesday":
      return 1;
    case "Wednesday":
      return 2;
    case "Thursday":
      return 3;
    case "Friday":
      return 4;
    case "Saturday":
      return 5;
    case "Sunday":
      return 6;
    default:
      return 7;
  }
};

export const changeWeekdayToVietnamese = (weekday: string) => {
  switch (weekday) {
    case "Monday":
      return "Thứ 2";
    case "Tuesday":
      return "Thứ 3";
    case "Wednesday":
      return "Thứ 4";
    case "Thursday":
      return "Thứ 5";
    case "Friday":
      return "Thứ 6";
    case "Saturday":
      return "Thứ 7";
    case "Sunday":
      return "Chủ nhật";
    default:
      return "";
  }
};

export const getParamUrl = (name: string) => {
  let search = window.location.search;
  let urlParams = new URLSearchParams(search);
  let param = urlParams.get(name);
  return param;
};

export const datePickerLocale: PickerLocale = {
  lang: {
    ...CalendarLocale,
    placeholder: "Chọn ngày",
    locale: "vi_VN",
    today: "Hôm nay",
    now: "Hiện tại",
    ok: "Chọn",
    rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
    monthFormat: "[Tháng] M",
    shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  },
  timePickerLocale: {
    placeholder: "Chọn thời gian",
  },
};
