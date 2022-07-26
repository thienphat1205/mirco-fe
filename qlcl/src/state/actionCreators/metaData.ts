import { Dispatch } from "redux";
import { MetaDataTypes } from "../actionTypes";
import { IMetaDataAction } from "../actionsInterface/metaData";
import {
  getTicketStatusAPI,
  getTicketTypeAPI,
  getWarehousesAPI,
  getAllWarehousesAPI,
  getIssueTypesAPI,
} from "@/services/metaData";
import { dialog } from "@/utils/utils";

interface ResultType {
  error?: number;

  data?: {
    data?: any[];
    issue_types?: any[];
  };
}

export const setMetaDataReducer =
  (payload: object) => async (dispatch: Dispatch<IMetaDataAction>) => {
    dispatch({
      type: MetaDataTypes.SET_META_DATA_REDUCER,
      payload,
    });
  };

export const getTicketStatusList =
  () => async (dispatch: Dispatch<IMetaDataAction>) => {
    try {
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetStatus: true },
      });
      const response: ResultType = await getTicketStatusAPI();
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetStatus: false },
      });
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      dispatch({
        type: MetaDataTypes.GET_TICKETS_STATUS_LIST,
        payload: data?.data || [],
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getTicketTypeList =
  () => async (dispatch: Dispatch<IMetaDataAction>) => {
    try {
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetType: true },
      });
      const response: ResultType = await getTicketTypeAPI();
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetType: false },
      });
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const typeList = data?.data || [];
      dispatch({
        type: MetaDataTypes.GET_TICKETS_TYPE_LIST,
        payload: [{ id: "all", name: "Tất cả" }, ...typeList],
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getWarehouseList =
  () => async (dispatch: Dispatch<IMetaDataAction>) => {
    try {
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetStatus: true },
      });
      const response: ResultType = await getWarehousesAPI();
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetStatus: false },
      });
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      const warehouseList = data?.data || [];
      const formatNameWarehouseList = warehouseList.map(
        (item: { id: string; name: string }) => {
          const { id, name } = item;
          return {
            id,
            name: `${id} - ${name}`,
          };
        }
      );
      dispatch({
        type: MetaDataTypes.GET_WAREHOUSE_LIST,
        payload: formatNameWarehouseList,
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getAllWarehouseList = () => async (dispatch: Dispatch<any>) => {
  try {
    const response: ResultType = await getAllWarehousesAPI();
    const { data = {}, error = 0 } = response;
    if (error > 0) throw response;
    const warehouseList = data?.data || [];
    const formatNameWarehouseList = warehouseList.map(
      (item: { id: string; name: string }) => {
        const { id, name } = item;
        return {
          id,
          name: `${id} - ${name}`,
        };
      }
    );
    dispatch({
      type: MetaDataTypes.GET_ALL_WAREHOUSE_LIST,
      payload: formatNameWarehouseList,
    });
  } catch (errors) {
    dialog(errors);
  }
};

export const getIssueTypes = () => async (dispatch: Dispatch<any>) => {
  try {
    const response: ResultType = await getIssueTypesAPI();
    const { data = {}, error = 0 } = response;
    if (error > 0) throw response;

    dispatch({
      type: MetaDataTypes.GET_ISSUE_TYPES,
      payload: data?.issue_types || [],
    });
  } catch (errors) {
    dialog(errors);
  }
};
