import { MetaDataTypes } from "../actionTypes";

interface IMetaDataLoading {
  type: MetaDataTypes.META_DATA_LOADING;
  payload: object;
}

interface ISetMetaDataReducer {
  type: MetaDataTypes.SET_META_DATA_REDUCER;
  payload: object;
}

interface IGetHubActions {
  type: MetaDataTypes.GET_HUB_ACTIONS;

  payload: object;
}

interface IGetHubAreaActions {
  type: MetaDataTypes.GET_HUB_AREA_ACTIONS;

  payload: object;
}

export type IMetaDataAction =
  | IMetaDataLoading
  | ISetMetaDataReducer
  | IGetHubActions
  | IGetHubAreaActions;
