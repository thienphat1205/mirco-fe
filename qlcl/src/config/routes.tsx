import React, { lazy, ReactElement } from "react";
import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import { FaHome, FaClipboardList, FaClone } from "react-icons/fa";
// const AutoArrears = lazy(() => import("@/pages/AutoArrears"));
const ArrearsList = lazy(() => import("@/pages/ArrearsList"));
const Home = lazy(() => import("@/pages/Home"));
const Detail = lazy(() => import("@/pages/Detail"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QualityManagement = lazy(() => import("@/pages/QualityManagement"));
const SystemSettings = lazy(() => import("@/pages/SystemSettings"));

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
        redirect: "/home",
        component: Home,
        hideInMenu: true,
      },
      {
        title: "Quản lý chất lượng",
        path: "/home",
        key: "AutoArrears",
        icon: <FaHome />,
        component: QualityManagement,
      },
      {
        title: "DS phiếu theo dõi",
        path: "/tickets",
        key: "ArrearsTickets",
        icon: <FaClipboardList />,
        component: ArrearsList,
        permission: "view_all_ticket",
      },
      {
        title: "Thiết lập hệ thống",
        path: "/system-settings",
        key: "SystemSettings",
        icon: <FaClone />,
        component: SystemSettings,
        permission: "system_settings",
      },
      {
        title: "Chi tiết phiếu phạt",
        path: "/detail/:id",
        component: Detail,
        hideInMenu: true,
        key: "Detail",
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
