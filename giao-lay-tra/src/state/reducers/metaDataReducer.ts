import { MetaDataTypes } from "../actionTypes";

const initialState = {
  loading: {},
  ticketStatusList: [],
  ticketTypeList: [],
};
interface IMetaDataState {
  loading: {
    loadingGetStatus?: boolean;
    loadingGetType?: boolean;
  };

  ticketStatusList: any[];

  ticketTypeList: any[];
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
