import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthorCodeLayout from "./components/AuthorCodeLayout";
import MainLayout from "./components/MainLayout";
import AuthorCode from "./pages/AuthorCode";
import store from "./state/store";

const KtcLcApp = lazy(() => import("./components/KtcLcApp"));
const QlclApp = lazy(() => import("./components/QlclApp"));

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path="/" element={<Navigate to="/ktc-lc" />} />
            <Route
              path="/qlcl/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <QlclApp />
                </Suspense>
              }
            />
            <Route
              path="/ktc-lc/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <KtcLcApp />
                </Suspense>
              }
            />
          </Route>
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
