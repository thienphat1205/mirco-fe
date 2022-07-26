import React from "react";
import styles from "./index.module.less";
import numeral from "numeral";
import CustomTitle from "../CustomTitle";

interface ArrearsAmountProps {
  amount: number;
}

const ArrearsAmount: React.FC<ArrearsAmountProps> = ({ amount }) => {
  return (
    <div className={styles.root}>
      <CustomTitle title="Thông tin truy thu" />
      <div className={styles.viewContent}>
        <p className={styles.textLabel}>Số tiền truy thu</p>
        <p className={styles.textAmount}>{numeral(amount).format("0,0")}</p>
      </div>
    </div>
  );
};

export default ArrearsAmount;
