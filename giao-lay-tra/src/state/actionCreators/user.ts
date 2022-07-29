import { Dispatch } from "redux";
import { UserTypes } from "../actionTypes";
import { logout } from "@/services/auth";
import { IUserAction } from "../actionsInterface/user";
import {
  verifyAuthorCodeAPI,
  PayloadActionVerifyType,
  getCurrentUserAPI,
  getAllowedAppListAPI,
} from "@/services/auth";
import { setLocalStorage } from "@/utils/utils";
import { dialog } from "@/utils/utils";

interface ResultType {
  status?: string;

  data?: {
    accessToken?: string;
    iamToken?: string;
    allowedApps?: Array<string>;
  };
}

export const setDataUserReducer =
  (payload: object) => async (dispatch: Dispatch<IUserAction>) => {
    dispatch({
      type: UserTypes.SET_DATA_USER_REDUCER,
      payload,
    });
  };

export const verifyAuthorCode =
  (payload: PayloadActionVerifyType, functionNavigate: () => void) =>
  async (dispatch: Dispatch<IUserAction>) => {
    try {
      dispatch({
        type: UserTypes.USER_LOADING,
        payload: { loadingVerify: true },
      });
      const response: ResultType = await verifyAuthorCodeAPI(payload);
      dispatch({
        type: UserTypes.USER_LOADING,
        payload: { loadingVerify: false },
      });
      const { status, data = {} } = response;
      if (status !== "OK") throw response;
      const { accessToken, iamToken } = data;
      setLocalStorage("SESSION", iamToken);
      setLocalStorage("ACCESS_TOKEN", accessToken);
      functionNavigate();
    } catch (errors) {
      logout();
    }
  };

export const getCurrentUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loadingGetCurrentUser: true },
    });
    const response: ResultType = await getCurrentUserAPI();
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loadingGetCurrentUser: false },
    });
    const { status, data = {} } = response;
    if (status !== "OK") throw response;
    dispatch({
      type: UserTypes.GET_CURRENT_USER,
      payload: data,
    });
    dispatch(getAllowedAppList());
  } catch (errors) {
    logout();
  }
};

export const getAllowedAppList = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loading: true },
    });
    const response: ResultType = await getAllowedAppListAPI();
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loading: false },
    });
    const { status, data = {} } = response;
    if (status !== "OK") throw response;
    dispatch({
      type: UserTypes.GET_ALLOWED_APP_LIST,
      payload: data?.allowedApps || [],
    });
  } catch (errors) {
    dialog(errors);
  }
};
