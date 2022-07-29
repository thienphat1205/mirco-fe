import React from "react";
import styles from "./index.module.less";

const Card: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
};

export default Card;
