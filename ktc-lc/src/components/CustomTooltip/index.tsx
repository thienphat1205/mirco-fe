import React from "react";
import s from "./index.module.less";

function CustomTooltip() {
  return (
    <div className={s.toolTip}>
      <p>
        Chỉ được phép giải trình các phiếu Đang giải trình cùng loại và cùng kho
        thao tác
      </p>
      <div className={s.arrow} />
    </div>
  );
}

export default CustomTooltip;
