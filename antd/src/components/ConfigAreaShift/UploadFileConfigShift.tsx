import React, { useState } from "react";
import s from "./index.module.less";
import { importShiftsAPI } from "@/services/shift";
import { Upload, notification } from "antd";
import { dialog } from "@/utils/utils";
import { FaFileImport } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

const propsUpload = {
  name: "file",
  multiple: false,
  showUploadList: false,
};

const UploadFileConfigShift: React.FC<{
  onCallback: Function;
  dataUploadFile: any;
  disabled: boolean;
}> = ({ onCallback, dataUploadFile, disabled }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadFile = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    const { hub_area_id, hub_id, layout } = dataUploadFile;
    formData.append("attachments", file);
    formData.append("hub_area_id", hub_area_id);
    formData.append("hub_id", hub_id);
    formData.append("layout", layout);
    try {
      setLoading(true);
      const response: any = await importShiftsAPI(formData);
      setLoading(false);
      const {
        data,
        code,
        message = "Upload lịch làm việc thành công",
      } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      onCallback(data);
    } catch (errors) {
      dialog(errors);
    }
  };

  return (
    <div className={s.uploadFileConfigShift}>
      <Upload
        {...propsUpload}
        customRequest={handleUploadFile}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        disabled={disabled || loading}
      >
        <div className={s.btnUpload}>
          <span>Upload lịch làm việc mới</span>
          {!loading ? <FaFileImport /> : <LoadingOutlined />}
        </div>
      </Upload>
    </div>
  );
};

export default UploadFileConfigShift;
