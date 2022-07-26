import React from "react";
import styles from "./index.module.less";

const CustomTitle: React.FC<{ title: string }> = ({ title }) => {
  return <div className={styles.title__separate}>{title}</div>;
};

export default CustomTitle;
