import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const NotFound: React.FC = () => {
  let navigate = useHistory();
  const handleClick = () => {
    navigate.push("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn truy cập không tồn tại."
      extra={
        <Button onClick={handleClick} type="primary">
          Quay về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
