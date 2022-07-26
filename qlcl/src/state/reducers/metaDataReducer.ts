import { MetaDataTypes } from "../actionTypes";

const initialState = {
  loading: {},
  ticketStatusList: [],
  ticketTypeList: [],
  warehouses: [],
  allWarehouses: [],
  issueTypes: [],
};
interface IMetaDataState {
  loading: {
    loadingGetStatus?: boolean;
    loadingGetType?: boolean;
  };

  ticketStatusList: any[];

  ticketTypeList: any[];

  warehouses: { id: string; name: string }[];
  allWarehouses: { id: string; name: string }[];

  issueTypes: any[];
}

interface IAction {
  type: string;
  payload?: any;
}

const metaDataReducer = (
  state: IMetaDataState = initialState,
  action: IAction
): IMetaDataState => {
  switch (action.type) {
    case MetaDataTypes.SET_META_DATA_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    case MetaDataTypes.GET_TICKETS_TYPE_LIST:
      return {
        ...state,
        ticketTypeList: action.payload,
      };
    case MetaDataTypes.GET_TICKETS_STATUS_LIST:
      return {
        ...state,
        ticketStatusList: action.payload,
      };
    case MetaDataTypes.GET_WAREHOUSE_LIST:
      return {
        ...state,
        warehouses: action.payload,
      };
    case MetaDataTypes.GET_ALL_WAREHOUSE_LIST:
      return {
        ...state,
        allWarehouses: action.payload,
      };
    case MetaDataTypes.GET_ISSUE_TYPES:
      return {
        ...state,
        issueTypes: action.payload,
      };
    case MetaDataTypes.META_DATA_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    default:
      return state;
  }
};

export default metaDataReducer;
