import React from "react";
import s from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import { Modal } from "antd";

interface ICustomModal {
  visible: boolean;
  onCancel: () => void;
  children: JSX.Element;
}

const CustomModal: React.FC<ICustomModal> = ({
  visible,
  onCancel,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      className={s.customModal}
      footer={null}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div className={s.contentModal}>{children}</div>
    </Modal>
  );
};

export default CustomModal;
