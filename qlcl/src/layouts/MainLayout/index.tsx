/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/utils";
import { login } from "@/services/auth";
import { Layout } from "antd";
import PageLoading from "@/components/PageLoading";
import Card from "@/components/Card";
import Authorized from "@/components/Authorized";
import styles from "./index.module.less";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import ButtonWarning from "@/components/ButtonWarning";

import Header from "@/components/Header";
import SiderMenu from "@/components/SiderMenu";

const { Content } = Layout;

const MainLayout: React.FC = (props: any) => {
  const { children } = props;
  console.log("children", children);
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

  if (!isReady || loadingGetCurrentUser || loading || loadingGetPermissions)
    return <PageLoading />;

  return (
    <Layout className={styles.root}>
      <Header onCollapse={handleCollapsedMenu} collapsed={collapsed} />
      <Layout className={styles.layoutHasSider}>
        <SiderMenu
          collapsed={collapsed}
          isMobile={isMobile}
          onCollapse={handleCollapsedMenu}
        />
        <Content>
          <Card>
            <Authorized>
              {children}
              <ButtonWarning />
            </Authorized>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
