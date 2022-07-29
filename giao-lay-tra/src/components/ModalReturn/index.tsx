import React from "react";
import { Modal, Button } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";

interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  rowSelected: {
    orderCode?: string;
  };
}

const ModalReturns: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  rowSelected = {},
}) => {
  return (
    <Modal
      title={"THÔNG BÁO"}
      className={styles.root}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          className={styles.btnCancel}
        >
          Huỷ
        </Button>,
        <Button
          key="submit"
          type="primary"
          className={styles.btnSubmit}
          //   loading={loading}
          onClick={handleCancel}
        >
          Trả hàng
        </Button>,
      ]}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div>Trả đơn hàng {rowSelected?.orderCode}</div>
    </Modal>
  );
};

export default ModalReturns;
