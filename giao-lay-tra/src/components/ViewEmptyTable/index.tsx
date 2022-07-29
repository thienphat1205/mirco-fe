import React from "react";
import { Empty } from "antd";
import s from "./index.module.less";

const ViewEmptyTable: React.FC = () => {
  return (
    <div className={s.viewEmpty}>
      <Empty description="Không có dữ liệu" />
    </div>
  );
};

export default ViewEmptyTable;
