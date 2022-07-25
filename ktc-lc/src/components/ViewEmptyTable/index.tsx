import React from "react";
import s from "./index.module.less";
import imgEmpty from "@/assets/images/empty.svg";

const ViewEmptyTable: React.FC = () => {
  return (
    <div className={s.viewEmpty}>
      <img src={imgEmpty} alt="empty" />
    </div>
  );
};

export default ViewEmptyTable;
