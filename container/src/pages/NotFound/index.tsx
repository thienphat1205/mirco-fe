import React from "react";
import { Result } from "antd";
import s from "./index.module.less";

const NotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <Result
        status="warning"
        title="There are some problems with your operation."
      />
    </div>
  );
};

export default NotFound;
