import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
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
