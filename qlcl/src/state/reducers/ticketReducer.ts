import { TicketTypes } from "../actionTypes";

const initialState = {
  loading: {},
  ticketInProcessList: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  ticketProcessed: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  totalInProcess: 0,
  totalProcessed: 0,
  ticketDetail: {},
  workflowDetail: {},
  arrearsTickets: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  ticketsBacklog: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  ticketsComplaint: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  totalBacklog: 0,
  totalComplaint: 0,
  assignmentRateList: {
    tickets: [],
    total: 0,
    isEmpty: false,
  },
  totalAssignmentRate: 0,
};

export interface IWorkflow {
  canSubmit?: boolean;
  canUpdate?: boolean;
  editAssignUsers?: boolean;
  editAttachments?: boolean;
  editMessage?: boolean;
  viewAssignUsers?: boolean;
  viewAttachments?: boolean;
  viewMessage?: boolean;
}

interface WorkflowDetail {
  workflowId?: string;
  explanationWorkflow?: IWorkflow;
}

interface TicketDetail {
  orderCode?: string;
  penaltyFee?: number;
  status?: string | number;
  ticketId?: string;
  ticketType?: string;
  canExplain?: boolean;
  closedAt?: string;
  createdAt?: string;
  deadline?: string;
  explanation?: any;

  workflowId?: string;

  canApprove?: boolean;

  approval_employee?: {
    id: string;
    name: string;
  }[];

  assignmentIssue?: {
    assignmentRatio: number;
    assignmentRequired: number;
  };
}
interface ITicketsState {
  loading: {
    loadingAction?: boolean;
    loadingGetTicketDetail?: boolean;
    loadingGetWorkflow?: boolean;
    loadingSubmit?: boolean;
    loadingApprove?: boolean;
    loadingReject?: boolean;
  };

  ticketInProcessList: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };

  ticketProcessed: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };
  totalInProcess: number;
  totalProcessed: number;

  ticketDetail: TicketDetail;

  workflowDetail: WorkflowDetail;

  arrearsTickets: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };
  ticketsBacklog: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };

  ticketsComplaint: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };
  totalBacklog: number;
  totalComplaint: number;

  assignmentRateList: {
    tickets: any[];
    total: number;
    isEmpty: boolean;
  };
  totalAssignmentRate: number;
}

interface IAction {
  type: string;
  payload?: any;
}

const ticketReducer = (
  state: ITicketsState = initialState,
  action: IAction
): ITicketsState => {
  switch (action.type) {
    case TicketTypes.SET_DATA_TICKET_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    case TicketTypes.GET_TICKETS_IN_PROCESS_LIST:
      const {
        tickets: newInProcessList = [],
        total: totalInProcess,
        isEmpty: isEmptyInProcessList,
      } = action.payload;
      const {
        ticketInProcessList: { tickets: currentInProcessList = [] } = {},
      } = state;
      const dataInProcess = {
        tickets: [...currentInProcessList, ...newInProcessList],
        total: totalInProcess,
        isEmpty: isEmptyInProcessList,
      };
      return {
        ...state,
        ticketInProcessList: dataInProcess,
      };
    case TicketTypes.GET_TICKETS_PROCESSED_LIST:
      const { tickets: newProcessedList = [], total, isEmpty } = action.payload;
      const { ticketProcessed: { tickets: currentProcessedList = [] } = {} } =
        state;
      const dataProcessed = {
        tickets: [...currentProcessedList, ...newProcessedList],
        total,
        isEmpty,
      };
      return {
        ...state,
        ticketProcessed: dataProcessed,
      };
    case TicketTypes.GET_TICKET_DETAIL:
      return {
        ...state,
        ticketDetail: action.payload,
      };
    case TicketTypes.TICKET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    case TicketTypes.GET_WORKFLOW_DETAIL:
      return {
        ...state,
        workflowDetail: action.payload,
      };
    case TicketTypes.GET_ARREARS_TICKETS:
      const {
        tickets: newTickets = [],
        total: totalArrearsTickets = 0,
        isEmpty: isEmptyArrearsTickets = false,
      } = action.payload;
      const { arrearsTickets: { tickets: currentTickets = [] } = {} } = state;
      const data = {
        tickets: [...currentTickets, ...newTickets],
        total: totalArrearsTickets,
        isEmpty: isEmptyArrearsTickets,
      };
      return {
        ...state,
        arrearsTickets: data,
      };
    case TicketTypes.GET_TICKETS_BACKLOG:
      const {
        tickets: newTicketsBacklog = [],
        total: totalTicketsBacklog,
        isEmpty: isEmptyTicketsBacklog,
      } = action.payload;
      const {
        ticketsBacklog: { tickets: currentTicketsBacklogList = [] } = {},
      } = state;
      const dataTicketsBacklog = {
        tickets: [...currentTicketsBacklogList, ...newTicketsBacklog],
        total: totalTicketsBacklog,
        isEmpty: isEmptyTicketsBacklog,
      };
      return {
        ...state,
        ticketsBacklog: dataTicketsBacklog,
      };
    case TicketTypes.GET_TICKETS_COMPLAINT:
      const {
        tickets: newTicketsComplaint = [],
        total: totalTicketsComplaint,
        isEmpty: isEmptyTicketsComplaint,
      } = action.payload;
      const {
        ticketsComplaint: { tickets: currentTicketsComplaint = [] } = {},
      } = state;
      const dataTicketsComplaint = {
        tickets: [...currentTicketsComplaint, ...newTicketsComplaint],
        total: totalTicketsComplaint,
        isEmpty: isEmptyTicketsComplaint,
      };
      return {
        ...state,
        ticketsComplaint: dataTicketsComplaint,
      };
    case TicketTypes.GET_ASSIGNMENT_RATE_LIST:
      const {
        tickets: newAssignmentRateList = [],
        total: totalAssignmentRateList,
        isEmpty: isEmptyAssignmentRateList,
      } = action.payload;
      const {
        assignmentRateList: { tickets: currentAssignmentRateList = [] } = {},
      } = state;
      const dataAssignmentRateList = {
        tickets: [...currentAssignmentRateList, ...newAssignmentRateList],
        total: totalAssignmentRateList,
        isEmpty: isEmptyAssignmentRateList,
      };
      return {
        ...state,
        assignmentRateList: dataAssignmentRateList,
      };
    default:
      return state;
  }
};

export default ticketReducer;
