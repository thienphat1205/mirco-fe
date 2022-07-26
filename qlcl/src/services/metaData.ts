import APINetworkService from "./APINetworkService";

export const getTicketStatusAPI = async () => {
  const rs = await APINetworkService({
    url: "/qlcl/public/metadata/get-ticket-status",
    data: {},
  });
  return rs;
};

export const getTicketTypeAPI = async () => {
  const rs = await APINetworkService({
    url: "/qlcl/public/metadata/get-ticket-type",
    data: {},
  });
  return rs;
};

export const getWarehousesAPI = async () => {
  const rs = await APINetworkService({
    url: "/qlcl/public/my-warehouses",
    data: {},
  });
  return rs;
};

export const getVersionsAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/get-versions",
    data: payload,
  });
  return rs;
};

export const importBacklogConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/import-backlog-configs",
    data: payload,
  });
  return rs;
};

export const importAssignIssueConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/import-assign-issue-configs",
    data: payload,
  });
  return rs;
};

export const getDetailBacklogConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/get-backlog-configs",
    data: payload,
  });
  return rs;
};

export const getDetailAsignIssueConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/get-assign-issue-configs",
    data: payload,
  });
  return rs;
};

export const deleteVersionAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/delete-version",
    data: payload,
  });
  return rs;
};

export const setCurrentVersionAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/set-current-version",
    data: payload,
  });
  return rs;
};

export const getPenaltyFeeConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/get-penalty-fee-configs",
    data: payload,
  });
  return rs;
};

export const editPenaltyFeeConfigAPI = async (payload: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/metadata/edit-penalty-fee-config",
    data: payload,
  });
  return rs;
};

export const getAllWarehousesAPI = async () => {
  const rs = await APINetworkService({
    url: "/qlcl/public/metadata/all-warehouses",
    data: {},
  });
  return rs;
};

export const getIssueTypesAPI = async () => {
  const rs = await APINetworkService({
    url: "/qlcl/public/metadata/get-all-issue-types",
    data: {},
  });
  return rs;
};
