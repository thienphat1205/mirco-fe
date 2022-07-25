import APINetworkService from "./APINetworkService";

type PayloadGetAreaListCheckin = {
  hub_id: string;
};

type PayloadGetUserInArea = {
  hub_area_id: string;
};

export type PayloadGetCheckinHistory = {
  from?: string;
  to?: string;
  hub_area_id: string;
  checkin_type?: number;
  user_id?: string;
  paging: { limit: number; offset: number };
};

type PayloadGetCheckinCode = {
  user_id: string;
  hub_id: string;
};

export const getAreaListCheckinAPI = async (payload: PayloadGetAreaListCheckin) => {
  const rs = await APINetworkService({
    url: "/workshift/public/dashboard/list-area-checkin",
    data: payload,
  });
  return rs;
};

export const getUserInAreaAPI = async (payload: PayloadGetUserInArea) => {
  const rs = await APINetworkService({
    url: "/workshift/public/dashboard/get-users-in-area",
    data: payload,
  });
  return rs;
};

export const getUserTypesAPI = async () => {
  const rs = await APINetworkService({
    url: "/workshift/public/metadata/get-user-types",
    data: {},
  });
  return rs;
};

export const getCheckinTypeAPI = async () => {
  const rs = await APINetworkService({
    url: "/workshift/public/metadata/get-checkin-type",
    data: {},
  });
  return rs;
};

export const getCheckinHistoryAPI = async (payload: PayloadGetCheckinHistory) => {
  const rs = await APINetworkService({
    url: "/workshift/public/dashboard/checkin-history",
    data: payload,
  });
  return rs;
};

export const getCheckInCodeAPI = async (payload: PayloadGetCheckinCode) => {
  const rs = await APINetworkService({
    url: "/workshift/public/session/gen-session",
    data: payload,
  });
  return rs;
};
