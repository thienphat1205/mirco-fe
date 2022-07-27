import { useGetCurrentPath } from "@/hooks/useGetCurrentPath";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { checkPermission } from "@/utils/utils";
import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Authorized: React.FC<{ children: any }> = ({ children }) => {
  const { permissions = [] } = useTypedSelector((state) => state.user);
  const { currentPath } = useGetCurrentPath("MainLayout");
  const navigate = useNavigate();
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
