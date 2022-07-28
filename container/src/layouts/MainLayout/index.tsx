/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/utils";
import { login } from "@/services/auth";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import PageLoading from "@/components/PageLoading";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
const Header = lazy(() => import("@/components/Header"));

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { getCurrentUser, getHubList } = useActions();
  const {
    loading: {
      loadingGetCurrentUser = false,
      loading = false,
      loadingGetPermissions = false,
      loadingGetHubList = false,
    } = {},
    hubList,
  } = useTypedSelector((state) => state.user);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  useEffect(() => {
    const token = getLocalStorage("SESSION");
    if (token) {
      setIsReady(true);
      getCurrentUser();
      getHubList();
    } else {
      login();
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const handleCollapsedMenu = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  if (
    !isReady ||
    loadingGetCurrentUser ||
    loading ||
    loadingGetPermissions ||
    loadingGetHubList
  )
    return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <Header
        onCollapse={handleCollapsedMenu}
        collapsed={collapsed}
        hubList={hubList}
      />
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
