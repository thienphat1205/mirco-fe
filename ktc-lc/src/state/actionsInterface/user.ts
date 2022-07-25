import { UserTypes } from "../actionTypes";
interface IUserLoading {
  type: UserTypes.USER_LOADING;
  payload: object;
}

interface ISetDataUserReducer {
  type: UserTypes.SET_DATA_USER_REDUCER;
  payload: object;
}

export type IUserAction = IUserLoading | ISetDataUserReducer;
