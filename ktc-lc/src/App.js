import PageLoading from "@/components/PageLoading";
import routeList from "@/config/routes";
import { Suspense, useEffect, lazy } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.less";
import reducer from "./state/reducer";
import { store as RelatedStore } from "./state/store";

import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import MainLayout from "@/layouts/MainLayout";
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ConfigWarehouseLayout = lazy(() =>
  import("@/pages/ConfigWarehouseLayout")
);
const WarehouseLayoutDetail = lazy(() =>
  import("@/pages/WarehouseLayoutDetail")
);
const CheckIn = lazy(() => import("@/pages/CheckIn"));
const CreateNewLayout = lazy(() => import("@/pages/CreateNewLayout"));
const CreateNewArea = lazy(() => import("@/pages/CreateNewArea"));
const EmployeeQR = lazy(() => import("@/pages/EmployeeQR"));
const ConfigSound = lazy(() => import("@/pages/ConfigSound"));

const App = (props) => {
  const { store = RelatedStore, history } = props;

  useEffect(() => {
    store.injectReducer("relatedReducer", reducer);
  }, []);

  return (
    <Provider store={store || {}}>
      <BrowserRouter history={history} basename="/ktc-lc">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route element={<AuthorCodeLayout />}>
              <Route path="/sso-login-v2" element={<AuthorCode />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/config-layout" />} />
              <Route
                path="/config-layout"
                element={<ConfigWarehouseLayout />}
              />
              <Route
                path="/config-layout/:id"
                element={<WarehouseLayoutDetail />}
              />
              <Route path="/create-layout" element={<CreateNewLayout />} />
              <Route path="/create-area/:layout" element={<CreateNewArea />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/employee-qr" element={<EmployeeQR />} />
              <Route path="/config-sound" element={<ConfigSound />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
