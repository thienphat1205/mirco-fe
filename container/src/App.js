import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoading from "./components/PageLoading";
import store from "./state/store";

import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
import MainLayout from "@/layouts/MainLayout";
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route element={<AuthorCodeLayout />}>
              <Route path="/sso-login-v2" element={<AuthorCode />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/ktc-lc" />} />
              <Route path="/qlcl/*" element={<QlclApp store={store} />} />
              <Route path="/ktc-lc/*" element={<KtcLcApp store={store} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
