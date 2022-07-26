import React from "react";
import styles from "./index.module.less";

const Card: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className={styles.card} style={{ minHeight: "calc(100vh - 80px)" }}>
      {children}
    </div>
  );
};

export default Card;
