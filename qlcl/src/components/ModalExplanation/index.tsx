import React from "react";
import { Modal } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import FormExplanation from "./FormExplanation";

interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  dataListSelected: string[];

  query: any;
}

const ModalExplanation: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  dataListSelected,
  query,
}) => {
  return (
    <Modal
      maskClosable={false}
      visible={visible}
      onCancel={handleCancel}
      className={styles.root}
      footer={null}
      width={800}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <FormExplanation
        dataListSelected={dataListSelected}
        onClose={handleCancel}
        query={query}
      />
    </Modal>
  );
};

export default ModalExplanation;
