/* eslint-disable react-hooks/exhaustive-deps */
import PageLoading from "@/components/PageLoading";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("@/components/Header"));

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
      <Header hubList={hubList} />
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
