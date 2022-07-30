/* eslint-disable react-hooks/exhaustive-deps */
import { getLocalStorage } from "@/utils/utils";
import React, { lazy, Suspense, useEffect, useState } from "react";
// import { login } from "@/services/auth";
import Card from "@/components/Card";
import PageLoading from "@/components/PageLoading";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";
import { login } from "@/services/auth";
import Authorized from "@/components/Authorized";
// import SiderMenu from "@/components/SiderMenu";
// import Header from "@/components/Header";
const SiderMenu = lazy(() => import("@/components/SiderMenu"));
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
  const { collapse, hideHeader } =
    useTypedSelector((state) => state.commonReducer) || {};
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
      !hideHeader && login();
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

  console.log({ collapsed, collapse });

  return (
    <Layout className={styles.root}>
      {!hideHeader && (
        <Header
          onCollapse={handleCollapsedMenu}
          collapsed={collapsed}
          hubList={hubList}
        />
      )}
      <Layout className={styles.layoutHasSider}>
        <SiderMenu
          collapsed={collapse || collapsed}
          isMobile={isMobile}
          onCollapse={handleCollapsedMenu}
        />
        <Content>
          <Card>
            <Authorized>
              <Outlet />
            </Authorized>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
