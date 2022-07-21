import React, { lazy, ReactElement } from "react";
import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import { FaClone, FaListAlt, FaQrcode, FaBullhorn } from "react-icons/fa";
const Home = lazy(() => import("@/pages/Home"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ConfigWarehouseLayout = lazy(
  () => import("@/pages/ConfigWarehouseLayout")
);
const WarehouseLayoutDetail = lazy(
  () => import("@/pages/WarehouseLayoutDetail")
);
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const CreateNewLayout = lazy(() => import("@/pages/CreateNewLayout"));
const CreateNewArea = lazy(() => import("@/pages/CreateNewArea"));
const EmployeeQR = lazy(() => import("@/pages/EmployeeQR"));
const ConfigSound = lazy(() => import("@/pages/ConfigSound"));

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
        redirect: "/config-layout",
        component: Home,
        hideInMenu: true,
      },
      {
        title: "Thiết lập khu vực kho",
        path: "/config-layout",
        key: "config-layout",
        icon: <FaClone />,
        component: ConfigWarehouseLayout,
      },
      {
        title: "Thiết lập khu vực kho",
        path: "/config-layout/:id",
        key: "config-layout",
        component: WarehouseLayoutDetail,
        hideInMenu: true,
      },
      {
        title: "Tạo layout mới",
        path: "/create-layout",
        key: "create-layout",
        component: CreateNewLayout,
        hideInMenu: true,
      },
      {
        title: "Tạo khu vực mới",
        path: "/create-area/:layout",
        key: "create-area",
        component: CreateNewArea,
        hideInMenu: true,
      },
      {
        title: "DS Nhân viên tại KV",
        path: "/check-in",
        key: "check-in",
        icon: <FaListAlt />,
        component: CheckIn,
      },
      {
        title: "QR Nhân viên",
        path: "/employee-qr",
        key: "employee-qr",
        icon: <FaQrcode />,
        component: EmployeeQR,
      },
      {
        title: "Thiết lập âm thanh",
        path: "/config-sound",
        key: "config-sound",
        icon: <FaBullhorn />,
        component: ConfigSound,
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
