/* eslint-disable react-hooks/exhaustive-deps */
import logo from "@/assets/images/logo.svg";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getParamUrl } from "@/utils/utils";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./index.module.less";

const AuthorCode: React.FC = () => {
  const navigate = useNavigate();
  const { loading: { loadingVerify = false } = {} } = useTypedSelector(
    (state) => state.user
  );
  const { verifyAuthorCode } = useActions();

  useEffect(() => {
    const authorcode = getParamUrl("authorcode");
    if (typeof authorcode === "string") {
      verifyAuthorCode({ authorCode: authorcode }, handleNavigateToHomePage);
    }
  }, []);

  const handleNavigateToHomePage = (): void => navigate("/");

  return (
    <div className={s.root}>
      <img src={logo} alt="logo-GHN" className={s.logo} />
      {loadingVerify && <Spin size="large" />}
    </div>
  );
};

export default AuthorCode;
