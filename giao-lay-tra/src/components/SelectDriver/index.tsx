import { Modal } from "antd";
import React from "react";
import s from "./index.module.less";
import ViewSelectDriver from "./ViewSelectDriver";
import closeIcon from "@/assets/images/closeIcon.png";

const ModalSelectDriver: React.FC<any> = (props) => {
  const { show, handleCancel } = props;
  return (
    <Modal
      title="Chọn Chiến Binh Đường Phố"
      className={s.root}
      visible={show}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
      width={1000}
    >
      <div className={s.contentModal}>
        <ViewSelectDriver />
      </div>
    </Modal>
  );
};
export default ModalSelectDriver;
