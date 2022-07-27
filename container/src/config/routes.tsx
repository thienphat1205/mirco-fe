import React, { lazy, ReactElement } from "react";
import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
const Home = lazy(() => import("@/pages/Home"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));

export interface RouteType {
  path: string;
  title: string;
  key: string;

  icon?: ReactElement;

  hideInMenu?: boolean;
  component: React.LazyExoticComponent<React.FC<{}>>;

  redirect?: string;

  permission?: string;
}

export interface LayoutType {
  layout: React.FC<{}>;
  name: string;
  routes: RouteType[];
}

const routeList: LayoutType[] = [
  {
    layout: AuthorCodeLayout,
    name: "AuthorCodeLayout",
    routes: [
      {
        title: "Verify code",
        path: "/sso-login-v2",
        key: "AuthorCode",
        component: AuthorCode,
      },
    ],
  },
  {
    layout: MainLayout,
    name: "MainLayout",
    routes: [
      {
        title: "Giao hàng nhanh",
        path: "/",
        key: "Home",
        redirect: "/ktc-lc",
        component: Home,
        hideInMenu: true,
      },
      {
        title: "KTC-LC",
        path: "/ktc-lc/*",
        key: "ktc-lc",
        component: QlclApp,
      },
      {
        title: "QLCL",
        path: "/qlcl/*",
        key: "qlcl",
        component: KtcLcApp,
        hideInMenu: true,
      },
      {
        title: "Not found",
        path: "*",
        component: NotFound,
        hideInMenu: true,
        key: "notFound",
      },
    ],
  },
];

export default routeList;
