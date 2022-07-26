import { MetaDataTypes } from "../actionTypes";

interface IMetaDataLoading {
  type: MetaDataTypes.META_DATA_LOADING;
  payload: object;
}

interface ISetMetaDataReducer {
  type: MetaDataTypes.SET_META_DATA_REDUCER;
  payload: object;
}

interface IGetTicketStatusList {
  type: MetaDataTypes.GET_TICKETS_STATUS_LIST;

  payload: object;
}

interface IGetTicketTypeList {
  type: MetaDataTypes.GET_TICKETS_TYPE_LIST;

  payload: object;
}

interface IGetWarehouseList {
  type: MetaDataTypes.GET_WAREHOUSE_LIST;

  payload: object;
}

export type IMetaDataAction =
  | IMetaDataLoading
  | ISetMetaDataReducer
  | IGetTicketStatusList
  | IGetTicketTypeList
  | IGetWarehouseList;
