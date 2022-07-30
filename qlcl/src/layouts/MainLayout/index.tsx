/* eslint-disable react-hooks/exhaustive-deps */
import Authorized from "@/components/Authorized";
import ButtonWarning from "@/components/ButtonWarning";
import Card from "@/components/Card";
import PageLoading from "@/components/PageLoading";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import { Layout } from "antd";
import React, { lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";
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
      getWarehouseList();
      getAllWarehouseList();
      getIssueTypes();
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

  if (!isReady || loadingGetCurrentUser || loading || loadingGetPermissions)
    return <PageLoading />;

  return (
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
            <Authorized>
              <Outlet />
              <ButtonWarning />
            </Authorized>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
