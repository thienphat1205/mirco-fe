import React, { useState } from "react";
import s from "./index.module.less";
import { Upload, notification } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { dialog } from "@/utils/utils";
import {
  importBacklogConfigAPI,
  importAssignIssueConfigAPI,
} from "@/services/metaData";
import { uploadFileApi } from "@/services/uploadFile";
import { LoadingOutlined } from "@ant-design/icons";

const propsUpload = {
  name: "file",
  multiple: false,
  showUploadList: false,
};

const UploadFileSystemSettings: React.FC<{
  onCallback: Function;
  type: string;
}> = ({ onCallback, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImport, setLoadingImport] = useState<boolean>(false);

  const handleUploadFile = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("files", file);
    try {
      setLoading(true);
      const rsUpload: any = await uploadFileApi(formData);
      if (rsUpload && rsUpload?.fileId) {
        const { fileId } = rsUpload;
        handleImportFile({ file_id: fileId });
      }
    } catch (errors) {
      setLoading(false);
      dialog(errors);
    }
  };

  const handleImportFile = async (payload: { file_id: string }) => {
    try {
      setLoading(true);
      setLoadingImport(true);
      const response: any =
        type === "backlog"
          ? await importBacklogConfigAPI(payload)
          : await importAssignIssueConfigAPI(payload);
      setLoading(false);
      setLoadingImport(false);
      const { error = 0 } = response;
      if (error > 0) throw response;
      notification.success({
        message: "Import thành công",
      });
      onCallback();
    } catch (errors) {
      dialog(errors);
    }
  };

  return (
    <div className={s.root}>
      <Upload
        {...propsUpload}
        customRequest={handleUploadFile}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        disabled={loading}
      >
        <div className={s.btnUpload}>
          {loading ? (
            <>
              <span style={{ marginRight: "8px" }}>
                {loadingImport ? "Importing..." : "Đang tải lên"}
              </span>
              <LoadingOutlined />
            </>
          ) : (
            <>
              <FaPlusCircle className={s.icon} />
              <span>Upload phiên bản mới</span>
            </>
          )}
        </div>
      </Upload>
    </div>
  );
};

export default UploadFileSystemSettings;
