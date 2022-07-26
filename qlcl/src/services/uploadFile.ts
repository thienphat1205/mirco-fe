import { notification } from "antd";
import APINetworkService from "./APINetworkService";
import { dialog, getKeyValue, getEnv } from "@/utils/utils";
import proxy from "@/config/proxy";

const genTokenUpload = async () => {
  let token: string | undefined = "";
  try {
    const response: any = await APINetworkService({
      url: "/qlcl/public/metadata/generate-token-upload-file",
      method: "post",
    });
    const { data = {}, error = 0 } = response;
    if (error > 0) throw response;
    token = data?.token;
  } catch (errors) {
    dialog(errors);
  }
  return token;
};

export const uploadFileApi = async (payload: any) => {
  let uploadResult: object | undefined;
  try {
    const token = await genTokenUpload();
    if (token) {
      const response: any = await APINetworkService({
        url: `/file/public-api/files/upload?token=${token}`,
        method: "post",
        data: payload,
        serviceName: "UPLOAD",
      });
      const { data = [], error = 0 } = response;
      if (error > 0) throw response;
      notification.success({
        message: "Tải lên thành công",
      });
      const [first] = data;
      const {
        file_name = "",
        data: { content_type = "", _id: fileId = "" } = {},
      } = first;
      uploadResult = {
        fileName: file_name,
        fileId,
        type: content_type,
      };
    }
  } catch (errors) {
    dialog(errors);
  }
  return uploadResult;
};

export const genTokenDownload = async (payload: any) => {
  let token = "";
  try {
    const response: any = await APINetworkService({
      url: "/qlcl/public/metadata/generate-token-download-file",
      method: "post",
      data: payload,
    });
    const { data, error = 0 } = response;
    token = data?.token;
    if (error > 0) throw response;
  } catch (errors) {
    dialog(errors);
  }
  return token;
};

export const downloadFileAPI = async (payload: any) => {
  try {
    const ENV = getEnv();
    const serviceName = "UPLOAD";
    const proxyByEnv = proxy[ENV];

    const baseURL = getKeyValue(proxyByEnv)(serviceName);
    const token = await genTokenDownload(payload);
    if (token) {
      let a = document.createElement("a");
      a.href = `${baseURL}/file/public-api/files/download?token=${token}`;
      a.download = "true";
      a.click();
      a.remove();
    }
  } catch (errors) {
    dialog(errors);
  }
};
