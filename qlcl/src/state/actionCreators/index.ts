import * as actionTickets from "./tickets";
import * as actionUser from "./user";
import * as actionMetaData from "./metaData";

export const actionCreators = {
  ...actionUser,
  ...actionTickets,
  ...actionMetaData,
};
