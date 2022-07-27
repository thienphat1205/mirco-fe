import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));

import { Provider } from "react-redux";
import store from "./state/store";

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthorCodeLayout />}>
            <Route
              path="/sso-login-v2"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AuthorCode />
                </Suspense>
              }
            />
          </Route>
          <Route element={<MainLayout />}>
            <Route exact path="/" element={<Navigate to="/ktc-lc" />} />
            <Route
              path="/ktc-lc/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <KtcLcApp />
                </Suspense>
              }
            />
            <Route
              path="/qlcl/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <QlclApp />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/ktc-lc" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
