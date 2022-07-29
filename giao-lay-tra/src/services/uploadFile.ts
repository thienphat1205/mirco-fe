import { notification } from "antd";
import APINetworkService from "./APINetworkService";
import { dialog } from "@/utils/utils";

interface IData {
  url?: string;
}

interface ResultType {
  isSuccess?: boolean;
  data?: IData;
}

export const uploadImageAPI = async (payload: any) => {
  let url: string | undefined = "";
  try {
    const response: ResultType = await APINetworkService({
      url: "/ops-common/v1/uploads/uploadFile",
      method: "post",
      data: payload,
    });
    const { isSuccess, data = {} } = response;
    if (!isSuccess) throw response;
    notification.success({
      message: "Tải lên thành công",
    });
    url = data?.url;
  } catch (errors) {
    dialog(errors);
  }
  return url;
};
