/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Spin } from "antd";
import logo from "@/assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import s from "./index.module.less";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getParamUrl } from "@/utils/utils";

const AuthorCode: React.FC = () => {
  const history = useHistory();
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

  const handleNavigateToHomePage = (): void => history.push("/");

  return (
    <div className={s.root}>
      <img src={logo} alt="logo-GHN" className={s.logo} />
      {loadingVerify && <Spin size="large" />}
    </div>
  );
};

export default AuthorCode;
