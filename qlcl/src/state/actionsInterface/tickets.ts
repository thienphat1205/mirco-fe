import { TicketTypes } from "../actionTypes";

interface ITicketLoading {
  type: TicketTypes.TICKET_LOADING;
  payload: object;
}

interface ISetDataTicketReducer {
  type: TicketTypes.SET_DATA_TICKET_REDUCER;
  payload: object;
}

interface IGetTicketsInProcessList {
  type: TicketTypes.GET_TICKETS_IN_PROCESS_LIST;

  payload: object;
}

interface IUpdateExplanationTickets {
  type: TicketTypes.UPDATE_EXPLANATION_TICKETS;

  payload: object;
}

interface IGetTicketsProcessedList {
  type: TicketTypes.GET_TICKETS_PROCESSED_LIST;

  payload: object;
}

interface IGetTicketsDetail {
  type: TicketTypes.GET_TICKET_DETAIL;

  payload: object;
}

interface IGetWorkflowDetail {
  type: TicketTypes.GET_WORKFLOW_DETAIL;

  payload: object;
}

interface IGetArrearsTickets {
  type: TicketTypes.GET_ARREARS_TICKETS;

  payload: object;
}

interface IGetTicketsBacklog {
  type: TicketTypes.GET_TICKETS_BACKLOG;

  payload: object;
}

interface IGetTicketsComplaint {
  type: TicketTypes.GET_TICKETS_COMPLAINT;

  payload: object;
}

interface IGetAssignmentRateList {
  type: TicketTypes.GET_ASSIGNMENT_RATE_LIST;

  payload: object;
}

export type ITicketAction =
  | ITicketLoading
  | ISetDataTicketReducer
  | IGetTicketsInProcessList
  | IGetTicketsProcessedList
  | IUpdateExplanationTickets
  | IGetTicketsDetail
  | IGetWorkflowDetail
  | IGetArrearsTickets
  | IGetTicketsBacklog
  | IGetTicketsComplaint
  | IGetAssignmentRateList;
