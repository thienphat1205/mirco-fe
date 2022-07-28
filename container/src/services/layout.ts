import APINetworkService from "./APINetworkService";

export type PayloadGetLayoutListType = {
  hub_id: string;
  paging: {
    limit: number;
    offset: number;
  };
};

export type PayloadCreateLayoutType = {
  hub_id: string;
  name: string;
};

export type PayloadUpdateLayoutType = {
  hub_id: string;
  layout: string;
};

export type PayloadGetAreaByLayout = {
  hub_id: string;
  layout: string;
  paging: {
    limit: number;
    offset: number;
  };
};

export const getLayoutListAPI = async (payload: PayloadGetLayoutListType) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/get-layout-list",
    data: payload,
  });
  return rs;
};

export const createLayoutAPI = async (payload: PayloadCreateLayoutType) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/create-layout",
    data: payload,
  });
  return rs;
};

export const applyLayoutAPI = async (payload: PayloadUpdateLayoutType) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/apply-layout",
    data: payload,
  });
  return rs;
};

export const deleteLayoutAPI = async (payload: PayloadUpdateLayoutType) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/delete-layout",
    data: payload,
  });
  return rs;
};

export const getAreaListByLayoutAPI = async (
  payload: PayloadUpdateLayoutType
) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/get-area-list",
    data: payload,
  });
  return rs;
};

export const createAreaAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/create-area",
    data: payload,
  });
  return rs;
};

export const getAreaByIdAPI = async (payload: { hub_area_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/get-area",
    data: payload,
  });
  return rs;
};

export const activeAreaAPI = async (payload: {
  hub_id: string;
  layout: string;
  area_code: string;
  active: boolean;
}) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/active-area",
    data: payload,
  });
  return rs;
};

export const updateAreaAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/update-area",
    data: payload,
  });
  return rs;
};

export const getAreaHistoryAPI = async (payload: { hub_area_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/get-area-history",
    data: payload,
  });
  return rs;
};

export const deleteAreaAPI = async (payload: { hub_area_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/delete-area",
    data: payload,
  });
  return rs;
};
