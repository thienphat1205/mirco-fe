import { Dispatch } from "redux";
import { TicketTypes } from "../actionTypes";
import { ITicketAction } from "../actionsInterface/tickets";
import { notification } from "antd";
import {
  getProcessedTicketsAPI,
  getInProcessTicketsAPI,
  PayloadGetTicketsListType,
  updateExplanationTicketsAPI,
  PayloadUpdateExplanationTickets,
  getTicketDetailAPI,
  getWorkflowDetailAPI,
  PayloadGetWorkflowDetail,
  submitTicketAPI,
  approveTicketAPI,
  rejectTicketAPI,
  getArrearsTicketsAPI,
  PayloadSubmitExplanation,
  getTicketsBacklogAPI,
  getTicketsComplaintAPI,
  getAssingmentRateListAPI,
} from "@/services/ticket";
import { dialog } from "@/utils/utils";
import { store } from "@/state/store";

interface ResultType {
  error?: number;

  data?: {
    tickets?: [];
    totalInProcess?: number;
    totalProcessed?: number;
    ticketDetail?: {};
    historyData?: any[];
    total?: number;
  };
  message?: string;
}

export const setDataTicketReducer =
  (payload: object) => async (dispatch: Dispatch<ITicketAction>) => {
    dispatch({
      type: TicketTypes.SET_DATA_TICKET_REDUCER,
      payload,
    });
  };

export const getTicketsInProcessList =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getInProcessTicketsAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], totalInProcess = 0, totalProcessed = 0 } = data;
      dispatch({
        type: TicketTypes.GET_TICKETS_IN_PROCESS_LIST,
        payload: {
          tickets,
          total: totalInProcess,
          isEmpty: totalInProcess === 0,
        },
      });
      dispatch({
        type: TicketTypes.SET_DATA_TICKET_REDUCER,
        payload: { totalInProcess, totalProcessed },
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getTicketsProcessedList =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getProcessedTicketsAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], totalInProcess = 0, totalProcessed = 0 } = data;
      dispatch({
        type: TicketTypes.GET_TICKETS_PROCESSED_LIST,
        payload: {
          tickets,
          total: totalProcessed,
          isEmpty: totalProcessed === 0,
        },
      });
      dispatch({
        type: TicketTypes.SET_DATA_TICKET_REDUCER,
        payload: { totalInProcess, totalProcessed },
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const updateExplanationTickets =
  (payload: PayloadUpdateExplanationTickets, nextFunction?: () => void) =>
  async (dispatch: Dispatch<ITicketAction | any>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingAction: true },
      });
      const response: ResultType = await updateExplanationTicketsAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingAction: false },
      });
      const { error = 0, message = "" } = response;
      if (error > 0) throw response;
      notification.success({
        message,
      });
      if (typeof nextFunction === "function") {
        nextFunction();
      }
      const { ticket: { ticketDetail: { ticketId = "" } = {} } = {} } =
        store.getState();
      dispatch(getTicketDetail(ticketId));
    } catch (errors) {
      dialog(errors);
    }
  };

export const getTicketDetail =
  (payload: string) => async (dispatch: Dispatch<ITicketAction>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: {
          loadingGetTicketDetail: true,
          loadingGetWorkflow: true,
        },
      });
      const response: ResultType = await getTicketDetailAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingGetTicketDetail: false },
      });
      const { error = 0, data = {} } = response;
      if (error > 0) throw response;
      dispatch({
        type: TicketTypes.GET_TICKET_DETAIL,
        payload: data?.ticketDetail || {},
      });
    } catch (errors) {
      dialog(errors);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingGetWorkflow: false },
      });
    }
  };

export const getWorkflowDetail =
  (payload: PayloadGetWorkflowDetail) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingGetWorkflow: true },
      });
      const response: ResultType = await getWorkflowDetailAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingGetWorkflow: false },
      });
      const { error = 0, data = {} } = response;
      if (error > 0) throw response;
      dispatch({
        type: TicketTypes.GET_WORKFLOW_DETAIL,
        payload: data,
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const submitTicket =
  (payload: PayloadSubmitExplanation) =>
  async (dispatch: Dispatch<ITicketAction | any>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingSubmit: true },
      });
      const response: ResultType = await submitTicketAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingSubmit: false },
      });
      const { error = 0 } = response;
      if (error > 0) throw response;
      const { ticket: { ticketDetail: { ticketId = "" } = {} } = {} } =
        store.getState();
      dispatch(getTicketDetail(ticketId));
    } catch (errors) {
      dialog(errors);
    }
  };

export const approveTicket =
  (payload: string) => async (dispatch: Dispatch<ITicketAction | any>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingApprove: true },
      });
      const response: ResultType = await approveTicketAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingApprove: false },
      });
      const { error = 0 } = response;
      if (error > 0) throw response;
      const { ticket: { ticketDetail: { ticketId = "" } = {} } = {} } =
        store.getState();
      dispatch(getTicketDetail(ticketId));
    } catch (errors) {
      dialog(errors);
    }
  };

export const rejectTicket =
  (payload: string) => async (dispatch: Dispatch<ITicketAction | any>) => {
    try {
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingReject: true },
      });
      const response: ResultType = await rejectTicketAPI(payload);
      dispatch({
        type: TicketTypes.TICKET_LOADING,
        payload: { loadingReject: false },
      });
      const { error = 0 } = response;
      if (error > 0) throw response;
      const { ticket: { ticketDetail: { ticketId = "" } = {} } = {} } =
        store.getState();
      dispatch(getTicketDetail(ticketId));
    } catch (errors) {
      dialog(errors);
    }
  };

export const getArrearsTickets =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getArrearsTicketsAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], total = 0 } = data;
      dispatch({
        type: TicketTypes.GET_ARREARS_TICKETS,
        payload: {
          tickets,
          total,
          isEmpty: total === 0,
        },
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getTicketsBacklog =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getTicketsBacklogAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], total = 0 } = data;
      dispatch({
        type: TicketTypes.GET_TICKETS_BACKLOG,
        payload: {
          tickets: tickets || [],
          total,
          isEmpty: total === 0,
        },
      });
      dispatch({
        type: TicketTypes.SET_DATA_TICKET_REDUCER,
        payload: { totalBacklog: total },
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getTicketsComplaint =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getTicketsComplaintAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], total = 0 } = data;
      dispatch({
        type: TicketTypes.GET_TICKETS_COMPLAINT,
        payload: {
          tickets: tickets || [],
          total,
          isEmpty: total === 0,
        },
      });
      dispatch({
        type: TicketTypes.SET_DATA_TICKET_REDUCER,
        payload: { totalComplaint: total },
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getAssingmentRateList =
  (payload: PayloadGetTicketsListType) =>
  async (dispatch: Dispatch<ITicketAction>) => {
    try {
      const response: ResultType = await getAssingmentRateListAPI(payload);
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const { tickets = [], total = 0 } = data;
      dispatch({
        type: TicketTypes.GET_ASSIGNMENT_RATE_LIST,
        payload: {
          tickets,
          total,
          isEmpty: total === 0,
        },
      });
      dispatch({
        type: TicketTypes.SET_DATA_TICKET_REDUCER,
        payload: { totalAssignmentRate: total },
      });
    } catch (errors) {
      dialog(errors);
    }
  };
