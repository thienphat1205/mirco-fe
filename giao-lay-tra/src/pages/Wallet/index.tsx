import React from "react";
import { Collapse } from "antd";
import DepositMoney from "./DepositMoney";
import TransactionInformation from "./TransactionInformation";
import s from "./index.module.less";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const { Panel } = Collapse;

const Wallet: React.FC = () => {
  return (
    <div className={s.root}>
      <Collapse
        defaultActiveKey={["deposit"]}
        bordered={false}
        expandIconPosition="right"
        expandIcon={({ isActive }) => {
          return !isActive ? (
            <FaPlusCircle className={s.iconExpand} />
          ) : (
            <FaMinusCircle className={s.iconExpand} />
          );
        }}
      >
        <Panel
          header={<span className={s.textTitle}>Thông tin giao dịch</span>}
          key="deposit"
        >
          <DepositMoney />
        </Panel>
      </Collapse>
      <div style={{ marginTop: "20px" }}>
        <TransactionInformation />
      </div>
    </div>
  );
};

export default Wallet;
