import React, { useState } from "react";
import { Row, Col, Spin, Upload } from "antd";
import styles from "./index.module.less";
import { FaPaperclip } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { uploadImageAPI } from "@/services/uploadFile";

interface UploadFileProps {
  fileList: string[] | [];

  handleChangeFileList: (value: string[]) => void;
}

const propsUpload = {
  name: "file",
  multiple: false,
  showUploadList: false,
};

const UploadFile: React.FC<UploadFileProps> = ({
  fileList,
  handleChangeFileList,
}) => {
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

  const handleUpload = async (options: any) => {
    setLoadingUpload(true);
    const { file } = options;
    const formData = new FormData();
    formData.append("file", file);
    const rs = await uploadImageAPI(formData);
    if (rs) {
      const newArr = [...fileList, rs];
      handleChangeFileList(newArr);
    }
    setLoadingUpload(false);
  };

  const genItemUploaded = (item: string, index: number): JSX.Element => {
    const name = item.split("/").pop();
    return (
      <Col>
        <div className={styles.itemUploaded}>
          <span>{"filename.***" || name}</span>
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

  return (
    <div className={styles.viewUpload}>
      <div className={styles.labelAndButtonUpload}>
        <label>File đính kèm</label>
        {loadingUpload ? (
          <Spin size="small" style={{ marginLeft: "5px" }} />
        ) : (
          <Upload {...propsUpload} customRequest={handleUpload}>
            <FaPaperclip className={styles.icon} />
          </Upload>
        )}
      </div>
      <Row gutter={[20, 0]}>
        {fileList.map((item, index) => genItemUploaded(item, index))}
      </Row>
    </div>
  );
};

export default UploadFile;
