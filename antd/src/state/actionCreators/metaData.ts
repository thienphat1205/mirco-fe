import { Dispatch } from "redux";
import { MetaDataTypes } from "../actionTypes";
import { IMetaDataAction } from "../actionsInterface/metaData";
import { getHubActionsAPI, getHubAreaActionsAPI } from "@/services/metaData";
import { dialog } from "@/utils/utils";

interface ResultType {
  error?: number;

  data?: {
    data?: any[];
  };
}

export const setMetaDataReducer =
  (payload: object) => async (dispatch: Dispatch<IMetaDataAction>) => {
    dispatch({
      type: MetaDataTypes.SET_META_DATA_REDUCER,
      payload,
    });
  };

export const getHubActions =
  (payload: { hub_id: string }) =>
  async (dispatch: Dispatch<IMetaDataAction>) => {
    try {
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetHubActions: true },
      });
      const response: ResultType = await getHubActionsAPI(payload);
      dispatch({
        type: MetaDataTypes.META_DATA_LOADING,
        payload: { loadingGetHubActions: false },
      });
      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      dispatch({
        type: MetaDataTypes.GET_HUB_ACTIONS,
        payload: data?.data || [],
      });
    } catch (errors) {
      dialog(errors);
    }
  };

export const getHubAreaActions =
  (payload: { hub_id: string }) =>
  async (dispatch: Dispatch<IMetaDataAction>) => {
    try {
      const response: ResultType = await getHubAreaActionsAPI(payload);

      const { data = {}, error = 0 } = response;
      if (error > 0) throw response;
      dispatch({
        type: MetaDataTypes.GET_HUB_AREA_ACTIONS,
        payload: data?.data || [],
      });
    } catch (errors) {
      dialog(errors);
    }
  };
