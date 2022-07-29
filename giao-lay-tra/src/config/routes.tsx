import React, { lazy, ReactElement } from "react";
import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import {
  FaDownload,
  FaUpload,
  FaWallet,
  FaPlusCircle,
  FaTasks,
  FaMoneyBill,
  FaSearchDollar,
  FaRoad,
} from "react-icons/fa";
const Recieve = lazy(() => import("@/pages/Recieve"));
const Return = lazy(() => import("@/pages/Return"));
const Home = lazy(() => import("@/pages/Home"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const Wallet = lazy(() => import("@/pages/Wallet"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AutoPick = lazy(() => import("@/pages/AutoPick"));
const AutoDeliver = lazy(() => import("@/pages/AutoDeliver"));
const SessionList = lazy(() => import("@/pages/SessionList"));
const SessionDetail = lazy(() => import("@/pages/SessionDetail"));
const CollectMoneyDriver = lazy(() => import("@/pages/CollectMoneyDriver"));
const ReceiptDetail = lazy(() => import("@/pages/ReceiptDetail"));
const ReceiptSearch = lazy(() => import("@/pages/ReceiptSearch"));
const TripList = lazy(() => import("@/pages/TripList"));
const TripDetail = lazy(() => import("@/pages/TripDetail"));

export interface RouteType {
  isParent?: boolean;
  path?: string;
  title: string;
  key: string;

  icon?: ReactElement;

  hideInMenu?: boolean;
  component?: React.LazyExoticComponent<React.FC<{}>>;

  redirect?: string;

  subRoutes?: RouteType[];

  openTab?: string;
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
        redirect: "/nhan-hang",
        component: Home,
        hideInMenu: true,
      },
      {
        isParent: true,
        key: "station",
        title: "Điểm giao dịch",
        subRoutes: [
          {
            title: "Nhận hàng",
            path: "/nhan-hang",
            key: "recieve",
            icon: <FaDownload />,
            component: Recieve,
            openTab: "station",
          },
          {
            title: "Trả hàng",
            path: "tra-hang",
            key: "returns",
            icon: <FaUpload />,
            component: Return,
            openTab: "station",
          },
          {
            title: "Nạp ví",
            path: "/nap-vi",
            key: "Wallet",
            icon: <FaWallet />,
            component: Wallet,
            openTab: "station",
          },
        ],
      },
      {
        isParent: true,
        key: "lastmile",
        title: "Lastmile",
        subRoutes: [
          {
            title: "DS chuyến đi",
            path: "/trip-list",
            key: "trip-list",
            icon: <FaRoad />,
            component: TripList,
            openTab: "lastmile",
          },
          {
            title: "Thu tiền",
            path: "/receipt/collect-money-driver",
            key: "collect-money-driver",
            icon: <FaMoneyBill />,
            component: CollectMoneyDriver,
            openTab: "lastmile",
          },
          {
            title: "Chi tiết phiếu thu",
            path: "/receipt-detail/:id",
            key: "receipt-detail",
            component: ReceiptDetail,
            openTab: "lastmile",
            hideInMenu: true,
          },
          {
            title: "Tìm kiếm phiếu thu",
            path: "/receipt-search",
            key: "receipt-search",
            icon: <FaSearchDollar />,
            component: ReceiptSearch,
            openTab: "lastmile",
          },
          {
            title: "Tạo CĐ auto lấy",
            path: "/create-auto-pick",
            key: "autoPick",
            icon: <FaPlusCircle />,
            component: AutoPick,
            openTab: "lastmile",
          },
          {
            title: "Tạo CĐ auto giao",
            path: "/create-auto-deliver",
            key: "autoDeliver",
            icon: <FaPlusCircle />,
            component: AutoDeliver,
            openTab: "lastmile",
          },
          {
            title: "Chi tiết đơn hàng",
            path: "/trip-detail/:id",
            key: "trip-detail",
            component: TripDetail,
            openTab: "lastmile",
            hideInMenu: true,
          },
        ],
      },
      {
        isParent: true,
        key: "megahub",
        title: "Megahub",
        subRoutes: [
          {
            title: "Danh sách phiên",
            path: "/session-list",
            key: "sessionList",
            icon: <FaTasks />,
            component: SessionList,
            openTab: "megahub",
          },
          {
            title: "Chi tiết phiên",
            path: "/session-detail/:id",
            key: "sessionDetail",
            component: SessionDetail,
            openTab: "megahub",
            hideInMenu: true,
          },
        ],
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
