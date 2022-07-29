import React from "react";
import { Modal, Button } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";

interface ModalProps {
  visible: boolean;

  onCancel: () => void;

  onOk: () => void;

  loading: boolean;

  description: string;
}

const ModalConfirmRemove: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
  loading,
  description,
}) => {
  return (
    <Modal
      title="Xác nhận"
      className={styles.root}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} className={styles.btnCancel}>
          Đóng
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          loading={loading}
          onClick={onOk}
        >
          Xác nhận
        </Button>,
      ]}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      {description}
    </Modal>
  );
};

export default ModalConfirmRemove;
