import PageLoading from "@/components/PageLoading";
import routeList from "@/config/routes";
import { Suspense, useEffect, lazy } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.less";
import ticketReducer from "./state/reducers/ticketReducer";
import { store as RelatedStore } from "./state/store";

import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import MainLayout from "@/layouts/MainLayout";

const ArrearsList = lazy(() => import("@/pages/ArrearsList"));
const Detail = lazy(() => import("@/pages/Detail"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const QualityManagement = lazy(() => import("@/pages/QualityManagement"));
const SystemSettings = lazy(() => import("@/pages/SystemSettings"));

const App = (props) => {
  const { store = RelatedStore, history } = props;

  useEffect(() => {
    // add state ticked to parent reducer
    store.injectReducer("ticket", ticketReducer);
  }, []);

  return (
    <Provider store={store || {}}>
      <Router location={history.location} navigator={history} basename="/qlcl">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route element={<AuthorCodeLayout />}>
              <Route path="/sso-login-v2" element={<AuthorCode />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<QualityManagement />} />
              <Route path="/tickets" element={<ArrearsList />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
