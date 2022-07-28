/* eslint-disable react-hooks/exhaustive-deps */
import Authorized from "@/components/Authorized";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import React, { lazy, useEffect } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("@/components/Header"));

const MainLayout: React.FC = () => {
  const { getCurrentUser, getHubList } = useActions();
  const { hubList } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const token = getLocalStorage("SESSION");
    if (token) {
      getCurrentUser();
      getHubList();
    } else {
      login();
    }
  }, []);

  return (
    <>
      <Header hubList={hubList} />
      <Authorized>
        <Outlet />
      </Authorized>
    </>
  );
};

export default MainLayout;
