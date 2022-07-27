import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./state/store";

const AuthorCodeLayout = lazy(() => import("@/layout/AuthorCodeLayout"));
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));
const MainLayout = lazy(() => import("@/layout/MainLayout"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));

const App = () => {
  return (
    <Provider store={store}>
      <React.Suspense fallback={null}>
        <Main />
      </React.Suspense>
    </Provider>
  );
};

const Main = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
                  <KtcLcApp store={store} />
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
