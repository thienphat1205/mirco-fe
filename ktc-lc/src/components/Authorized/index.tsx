import React from "react";
import { Result, Button } from "antd";
import { checkPermission } from "@/utils/utils";
import { useGetCurrentPath } from "@/hooks/useGetCurrentPath";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

const Authorized: React.FC<{ children: any }> = ({ children }) => {
  const { permissions = [] } = useTypedSelector((state) => state.user);
  const { currentPath } = useGetCurrentPath("MainLayout");
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      {checkPermission(permissions, currentPath?.permission) ? (
        children
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Bạn không có quyền truy cập vào trang này"
          extra={
            <Button onClick={handleClick} type="primary">
              Quay về trang chủ
            </Button>
          }
        />
      )}
    </>
  );
};

export default Authorized;
