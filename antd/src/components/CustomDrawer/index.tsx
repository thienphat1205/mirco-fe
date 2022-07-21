import React from "react";
import styles from "./index.module.less";
import { Drawer } from "antd";
import { FaTimes } from "react-icons/fa";

interface CustomDrawerProps {
  visible: boolean;
  onClose: () => void;
  size?: "large" | "default" | undefined;
  footer: React.ReactNode | null;
  title: string;
  width?: string | number | undefined;
}

const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
  const {
    visible,
    onClose,
    size = "large",
    footer,
    title,
    children,
    width,
  } = props;
  return (
    <Drawer
      width={width}
      className={styles.customDrawer}
      onClose={onClose}
      visible={visible}
      destroyOnClose
      size={size}
      title={
        <div className={styles.customDrawer__header}>
          <p className={styles.text}>{title}</p>
          <FaTimes className={styles.icon} onClick={onClose} />
        </div>
      }
      footer={footer}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
