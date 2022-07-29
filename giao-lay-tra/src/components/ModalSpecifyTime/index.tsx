import closeIcon from "@/assets/images/closeIcon.png";
import { Modal } from "antd";
import React from "react";
import styles from "./index.module.less";
import FormConfigTime from "./FormConfigTime";

interface ModalProps {
  visible: boolean;

  onCancel: () => void;

  onOk: (values: any) => void;

  loading: boolean;

  defaultValues: any[];
}

const ModalSpecifyTime: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
  loading,
  defaultValues,
}) => {
  return (
    <Modal
      title="Chỉ định thời điểm lấy"
      className={styles.root}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <FormConfigTime
        onCancel={onCancel}
        onOk={onOk}
        loading={loading}
        defaultValues={defaultValues}
      />
    </Modal>
  );
};

export default ModalSpecifyTime;
