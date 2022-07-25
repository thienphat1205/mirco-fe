import React from "react";
import s from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import { Modal } from "antd";

interface ICustomModal {
  visible: boolean;
  onCancel: () => void;
  children: JSX.Element;

  width?: number | undefined;
}

const CustomModal: React.FC<ICustomModal> = ({
  visible,
  onCancel,
  children,
  width,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      className={s.customModal}
      footer={null}
      width={width}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div className={s.contentModal}>{children}</div>
    </Modal>
  );
};

export default CustomModal;
