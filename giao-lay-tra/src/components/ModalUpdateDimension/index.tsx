import React from "react";
import { Modal, Button } from "antd";
import s from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  defaultValue: any;
}

const ModalUpateDimension: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  defaultValue,
}) => {
  return (
    <Modal
      title={`Cập nhật khối lượng đơn hàng ${defaultValue?.orderCode}`}
      className={s.root}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} className={s.btnCancel}>
          Huỷ
        </Button>,
        <Button
          key="submit"
          type="primary"
          className={s.btnSubmit}
          //   loading={loading}
          onClick={handleCancel}
        >
          Cập nhật
        </Button>,
      ]}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div>Cập nhật khối lượng</div>
    </Modal>
  );
};

export default ModalUpateDimension;
