import APINetworkService from "./APINetworkService";

export const getHubActionsAPI = async (data: { hub_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/metadata/get-hub-actions",
    data,
  });
  return rs;
};

export const getHubAreaActionsAPI = async (data: { hub_id: string }) => {
  const rs = await APINetworkService({
    url: "/workshift/public/metadata/get-hub-area-action",
    data,
  });
  return rs;
};
