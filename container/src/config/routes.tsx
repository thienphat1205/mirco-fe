import KtcLcApp from "@/components/KtcLcApp";
import MainLayout from "@/components/MainLayout";
import AuthorCode from "@/pages/AuthorCode";
import React, { lazy, ReactElement } from "react";
import { FaClone } from "react-icons/fa";
// import KtcLcApp from "../KtcLcApp";
// import MainLayout from "@/layouts/MainLayout";
// import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
// import { FaClone, FaListAlt, FaQrcode, FaBullhorn } from "react-icons/fa";
// const Home = lazy(() => import("@/pages/Home"));
// const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
// const NotFound = lazy(() => import("@/pages/NotFound"));
// const ConfigWarehouseLayout = lazy(
//   () => import("@/pages/ConfigWarehouseLayout")
// );
// const WarehouseLayoutDetail = lazy(
//   () => import("@/pages/WarehouseLayoutDetail")
// );
// const CheckIn = lazy(() => import("@/pages/CheckIn"));
// const CreateNewLayout = lazy(() => import("@/pages/CreateNewLayout"));
// const CreateNewArea = lazy(() => import("@/pages/CreateNewArea"));
// const EmployeeQR = lazy(() => import("@/pages/EmployeeQR"));
// const ConfigSound = lazy(() => import("@/pages/ConfigSound"));

export interface RouteType {
  path: string;
  title: string;
  key: string;

  icon?: ReactElement;

  hideInMenu?: boolean;

  component: any;

  redirect?: string;

  permission?: string;
}

export interface LayoutType {
  layout?: React.FC<{}>;
  name: string;
  routes: RouteType[];
}

const routeList: LayoutType[] = [
  {
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
    name: "MainLayout",
    routes: [
      {
        title: "Giao hàng nhanh",
        path: "/",
        key: "ktc-lc",
        redirect: "/ktc-lc",
        component: KtcLcApp,
        hideInMenu: true,
      },
      // {
      //   title: "Thiết lập khu vực kho",
      //   path: "/config-layout",
      //   key: "config-layout",
      //   icon: <FaClone />,
      //   component: ConfigWarehouseLayout,
      // },
    ],
  },
];

export default routeList;
