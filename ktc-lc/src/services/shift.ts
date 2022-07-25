import APINetworkService from "./APINetworkService";

export const getShiftAPI = async (data: { hub_schedule_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/shift/get-shifts",
    data,
  });
  return rs;
};

export const updateShiftsAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/shift/update-shifts",
    data,
  });
  return rs;
};

export const importShiftsAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/shift/import",
    data,
  });
  return rs;
};

export const refreshCheckinCodeAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/layout/refresh-checkin-code",
    data,
  });
  return rs;
};

export const deleteScheduleAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/shift/delete-schedule",
    data,
  });
  return rs;
};

export const getHubUsersAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/workshift/public/shift/get-hub-users",
    data,
  });
  return rs;
};

export const switchAreaAPI = async (data: {
  hub_area_id: string;
  user_id: string;
}) => {
  const rs = await APINetworkService({
    url: "/workshift/public/session/switch-area",
    data,
  });
  return rs;
};

export const forceCheckOutAPI = async (data: { user_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/session/force-check-out",
    data,
  });
  return rs;
};
