import { Dispatch } from "redux";
import { UserTypes } from "../actionTypes";
import { logout } from "@/services/auth";
import { IUserAction } from "../actionsInterface/user";
import {
  verifyAuthorCodeAPI,
  PayloadActionVerifyType,
  getCurrentUserAPI,
  getAllowedAppListAPI,
  getPermissionsAPI,
} from "@/services/auth";
import { setLocalStorage } from "@/utils/utils";
import { dialog, appList, getEnv } from "@/utils/utils";

interface ResultType {
  status?: string;

  error?: number;

  data?: {
    accessToken?: string;
    iamToken?: string;
    allowedApps?: Array<string>;
    permissions?: Array<string>;
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
    dispatch(getPermissions());
  } catch (errors) {
    logout();
  }
};

export const getAllowedAppList = () => async (dispatch: Dispatch<any>) => {
  const currentApp = {
    key: "quan_ly_chat_luong",
    name: "Quản lý chất lượng",
  };
  const ENV = getEnv();
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
    const { status, data: { allowedApps } = {} } = response;
    if (status !== "OK") throw response;
    let dataList: any[] = [];
    if (Array.isArray(allowedApps)) {
      dataList = [...allowedApps];
    }
    dispatch({
      type: UserTypes.GET_ALLOWED_APP_LIST,
      payload: dataList,
    });
    const permissionAccessPage = dataList.find(
      (item) => item === currentApp.key
    );
    if (!permissionAccessPage) {
      dispatch({
        type: UserTypes.USER_LOADING,
        payload: { loading: true },
      });
      const mapAppListToObject = dataList
        .map((item) => {
          const findItem = appList.find((itemApp) => itemApp.key === item);
          return findItem;
        })
        .sort((a: any, b: any) => a?.indexApp - b?.indexApp);
      alert(`Bạn không có quyền truy cập ${currentApp.name}`);
      const [firstApp] = mapAppListToObject;
      const link = firstApp ? firstApp?.link[ENV] : "";
      if (link) {
        window.location.href = link;
      } else {
        logout();
      }
    }
  } catch (errors) {
    dialog(errors);
  }
};

export const getPermissions = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loadingGetPermissions: true },
    });
    const response: ResultType = await getPermissionsAPI();
    dispatch({
      type: UserTypes.USER_LOADING,
      payload: { loadingGetPermissions: false },
    });
    const { error = 0, data = {} } = response;
    if (error > 0) throw response;
    dispatch({
      type: UserTypes.GET_PERMISSIONS,
      payload: data?.permissions || [],
    });
  } catch (errors) {
    dialog(errors);
  }
};
