import React from "react";
import { Spin } from "antd";

const PageLoading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default PageLoading;
