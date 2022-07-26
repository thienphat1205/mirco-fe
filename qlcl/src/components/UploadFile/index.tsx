import React, { useState, Fragment } from "react";
import { Row, Col, Spin, Upload, message } from "antd";
import styles from "./index.module.less";
import { FaPaperclip } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { uploadFileApi } from "@/services/uploadFile";

interface UploadFileProps {
  fileList: any[] | [];

  handleChangeFileList: (value: any[]) => void;

  disabled?: boolean;
}

const propsUpload = {
  name: "file",
  multiple: false,
  showUploadList: false,
};

const UploadFile: React.FC<UploadFileProps> = ({
  fileList,
  handleChangeFileList,
  disabled,
}) => {
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

  const handleUpload = async (options: any) => {
    setLoadingUpload(true);
    const { file } = options;
    const formData = new FormData();
    formData.append("files", file);
    const rs = await uploadFileApi(formData);
    if (rs) {
      const newArr = [...fileList, rs];
      handleChangeFileList(newArr);
    }
    setLoadingUpload(false);
  };

  const genItemUploaded = (item: any, index: number): JSX.Element => {
    const { fileName } = item;
    return (
      <Col>
        <div className={styles.itemUploaded}>
          <span>{fileName}</span>
          <IoClose
            className={styles.iconRemove}
            onClick={() => handleRemoveItemUploaded(index)}
          />
        </div>
      </Col>
    );
  };

  const handleRemoveItemUploaded = (index: number) => {
    const newArr = [...fileList];
    newArr.splice(index, 1);
    handleChangeFileList(newArr);
  };

  const beforeUpload = (file: any) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/bmp";
    if (!isImage) {
      message.error(`${file.name} không phải hình ảnh`);
    }
    return isImage;
  };

  return (
    <div className={styles.viewUpload}>
      <div className={styles.labelAndButtonUpload}>
        <label>File đính kèm</label>
        {loadingUpload ? (
          <Spin size="small" style={{ marginLeft: "5px" }} />
        ) : (
          <Upload
            {...propsUpload}
            customRequest={handleUpload}
            beforeUpload={beforeUpload}
            disabled={disabled}
          >
            <FaPaperclip
              className={styles.icon}
              style={disabled ? { pointerEvents: "none" } : {}}
            />
          </Upload>
        )}
      </div>
      <Row gutter={[20, 0]}>
        {fileList.map((item, index) => {
          return (
            <Fragment key={index}>{genItemUploaded(item, index)}</Fragment>
          );
        })}
      </Row>
    </div>
  );
};

export default UploadFile;
