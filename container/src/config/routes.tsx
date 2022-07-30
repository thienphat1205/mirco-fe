import { lazy, ReactElement } from "react";
import { FaClone } from "react-icons/fa";
const AuthorCodeLayout = lazy(() => import("@/layouts/AuthorCodeLayout"));
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
// const GltApp = lazy(() => import("@/components/GltApp"));

export interface RouteType {
  path: string;
  title: string;
  key: string;
  icon?: ReactElement;
  hideInMenu?: boolean;
  component: any;
  redirect?: string;
  permission?: string;
  exact?: boolean;
}

export interface LayoutType {
  layout?: React.FC<{}>;
  name: string;
  key: string;
  routes: RouteType[];
}

const routeList: LayoutType[] = [
  {
    name: "AuthorCodeLayout",
    layout: AuthorCodeLayout,
    key: "AuthorCodeLayout",
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
    layout: MainLayout,
    key: "MainLayout",
    routes: [
      {
        title: "Giao hàng nhanh",
        path: "/",
        key: "home",
        redirect: "/ktc-lc",
        exact: true,
        component: KtcLcApp,
      },
      {
        title: "Giao hàng nhanh",
        path: "/ktc-lc/*",
        key: "ktc-lc",
        component: KtcLcApp,
      },
      {
        title: "Quản lý chất lượng",
        path: "/qlcl/*",
        key: "qlcl",
        icon: <FaClone />,
        component: QlclApp,
      },
      // {
      //   title: "Giao-Lấy-Trả",
      //   path: "/giao-lay-tra/*",
      //   key: "giao-lay-tra",
      //   icon: <FaClone />,
      //   component: GltApp,
      // },

      {
        title: "Giao Hàng Nhanh",
        path: "*",
        key: "not-found",
        redirect: "/ktc-lc",
        component: NotFound,
      },
    ],
  },
];

export default routeList;
