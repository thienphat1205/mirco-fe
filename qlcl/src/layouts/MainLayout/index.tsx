/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/utils";
import { login } from "@/services/auth";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import PageLoading from "@/components/PageLoading";
import Card from "@/components/Card";
import Authorized from "@/components/Authorized";
import styles from "./index.module.less";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import ButtonWarning from "@/components/ButtonWarning";
const SiderMenu = lazy(() => import("@/components/SiderMenu"));
const Header = lazy(() => import("@/components/Header"));

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    getCurrentUser,
    getWarehouseList,
    getAllWarehouseList,
    getIssueTypes,
  } = useActions();
  const {
    loading: {
      loadingGetCurrentUser = false,
      loading = false,
      loadingGetPermissions = false,
    } = {},
  } = useTypedSelector((state) => state.user);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const state = useTypedSelector((state) => state);
  const { collapse } = useTypedSelector((state) => state.commonReducer);

  const isMobile = width < 768;

  useEffect(() => {
    const token = getLocalStorage("SESSION");
    if (token) {
      setIsReady(true);
      getCurrentUser();
      getWarehouseList();
      getAllWarehouseList();
      getIssueTypes();
    } else {
      // login();
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

  // if (!isReady || loadingGetCurrentUser || loading || loadingGetPermissions)
  //   return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <Layout className={styles.root}>
        {/* <Header onCollapse={handleCollapsedMenu} collapsed={collapsed} /> */}
        <Layout className={styles.layoutHasSider}>
          <SiderMenu
            collapsed={collapse}
            isMobile={isMobile}
            onCollapse={handleCollapsedMenu}
          />
          <Content>
            <Card>
              <Authorized>
                <Outlet />
                <ButtonWarning />
              </Authorized>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default MainLayout;
