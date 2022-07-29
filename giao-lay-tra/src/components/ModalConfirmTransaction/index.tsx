import React from "react";
import { Modal, Button } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import numeral from "numeral";

interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  transactionSelected: any;

  query: any;
}

const ModalConfirmTransaction: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  transactionSelected,
  query,
}) => {
  return (
    <Modal
      title="Xác nhận nạp ví"
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
          Xác nhận
        </Button>,
      ]}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div>Confirm transaction</div>
      <p>{`${transactionSelected?.client} - ${numeral(
        transactionSelected.amount
      ).format("0,0")}`}</p>
    </Modal>
  );
};

export default ModalConfirmTransaction;
