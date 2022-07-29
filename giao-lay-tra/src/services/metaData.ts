import APINetworkService from "./APINetworkService";

export const getTicketStatusAPI = async () => {
  const rs = await APINetworkService({
    url: "/truy-thu-tu-dong/metadata/get-ticket-status",
    data: {},
  });
  return rs;
};

export const getTicketTypeAPI = async () => {
  const rs = await APINetworkService({
    url: "/truy-thu-tu-dong/metadata/get-ticket-type",
    data: {},
  });
  return rs;
};
