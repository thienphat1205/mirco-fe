/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/utils";
import { login } from "@/services/auth";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import PageLoading from "@/components/PageLoading";
import Card from "@/components/Card";
import styles from "./index.module.less";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
const SiderMenu = lazy(() => import("@/components/SiderMenu"));
const Header = lazy(() => import("@/components/Header"));

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { getCurrentUser } = useActions();
  const { loading: { loadingGetCurrentUser = false, loading = false } = {} } =
    useTypedSelector((state) => state.user);
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

  if (!isReady || loadingGetCurrentUser || loading) return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <Layout className={styles.root}>
        {!hideHeader && (
          <Header onCollapse={handleCollapsedMenu} collapsed={collapsed} />
        )}
        <Layout className={styles.layoutHasSider}>
          <SiderMenu
            collapsed={collapse || collapsed}
            isMobile={isMobile}
            onCollapse={handleCollapsedMenu}
          />
          <Content>
            <Card>
              <Outlet />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default MainLayout;
