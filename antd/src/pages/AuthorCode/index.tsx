/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Spin } from "antd";
import logo from "@/assets/images/logo.svg";
import { useLocation } from "react-router-dom";
import s from "./index.module.less";
import queryString from "query-string";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

const AuthorCode: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { loading: { loadingVerify = false } = {} } = useTypedSelector(
    (state) => state.user
  );
  const { verifyAuthorCode } = useActions();

  useEffect(() => {
    const { authorcode } = queryString.parse(search);
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
