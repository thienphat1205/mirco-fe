import { MetaDataTypes } from "../actionTypes";

const initialState = {
  loading: {},
  hubActions: [],
  hubAreaActions: [],
};
interface IMetaDataState {
  loading: {
    loadingGetHubActions?: boolean;
  };
  hubActions: any[];

  hubAreaActions: any[];
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
    case MetaDataTypes.GET_HUB_ACTIONS:
      return {
        ...state,
        hubActions: action.payload,
      };
    case MetaDataTypes.GET_HUB_AREA_ACTIONS:
      return {
        ...state,
        hubAreaActions: action.payload,
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
