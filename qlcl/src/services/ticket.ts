import APINetworkService from "./APINetworkService";

export type PayloadGetTicketsListType = {
  filter?: {
    orderCode: string | undefined;
    status: number[] | string[] | undefined;
    ticketType: string | undefined;
  };
  pagingRequest: {
    limit: number;
    offset: number;
  };
  userId?: string;
};

export type PayloadGetActionHistory = {
  pagingRequest?: {
    limit: number;
    offset: number;
  };
  ticketId: string;
};

export type PayloadUpdateExplanationTickets = {
  ticketId: string[];
  assignedUserIds: string[];
  attachments?: string[];
  message: string;
};

export type PayloadGetWorkflowDetail = {
  workflowId: string;
};

export type PayloadSubmitExplanation = {
  ticketId: string;
  message: string;
  attachments: any[];
  assignedUsersIds: any[];
};

export const getInProcessTicketsAPI = async (
  data: PayloadGetTicketsListType
) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/info/get-in-process-tickets",
    data,
  });
  return rs;
};

export const getProcessedTicketsAPI = async (
  data: PayloadGetTicketsListType
) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/info/get-processed-tickets",
    data,
  });
  return rs;
};

export const getAssignableEmployeesAPI = async (ticketId: string) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-assignable-employees",
    data: {
      ticketId,
    },
  });
  return rs;
};

export const updateExplanationTicketsAPI = async (
  data: PayloadUpdateExplanationTickets
) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/update-explanations",
    data,
  });
  return rs;
};

export const getTicketDetailAPI = async (ticketId: string) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-ticket-detail",
    data: {
      ticketId,
    },
  });
  return rs;
};

export const getActionHistoryAPI = async (data: PayloadGetActionHistory) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-action-history",
    data,
  });
  return rs;
};

export const getWorkflowDetailAPI = async (data: PayloadGetWorkflowDetail) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/metadata/get-workflow-detail",
    data,
  });
  return rs;
};

export const submitTicketAPI = async (data: PayloadSubmitExplanation) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/submit-ticket-explanation",
    data,
  });
  return rs;
};

export const approveTicketAPI = async (ticketId: string) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/approve-ticket",
    data: {
      ticketId,
    },
  });
  return rs;
};

export const rejectTicketAPI = async (ticketId: string) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/reject-ticket",
    data: {
      ticketId,
    },
  });
  return rs;
};

export const getArrearsTicketsAPI = async (data: PayloadGetTicketsListType) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/management/arrears-tickets",
    data,
  });
  return rs;
};

export const getTicketsBacklogAPI = async (data: PayloadGetTicketsListType) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-backlog-tickets",
    data,
  });
  return rs;
};

export const getTicketsComplaintAPI = async (
  data: PayloadGetTicketsListType
) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-complaint-tickets",
    data,
  });
  return rs;
};

export const getAssingmentRateListAPI = async (
  data: PayloadGetTicketsListType
) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/ticket/get-hub-issue-tickets",
    data,
  });
  return rs;
};

export const getEarlyWarningsAPI = async (data: any) => {
  const rs = await APINetworkService({
    url: "/qlcl/public/issue/get-early-warnings",
    data,
  });
  return rs;
};
