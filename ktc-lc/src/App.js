import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import "./App.less";
import PageLoading from "@/components/PageLoading";
import { Helmet } from "react-helmet";
import routeList from "@/config/routes";
import { Provider } from "react-redux";
import store from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/ktc-lc">
        <Routes>
          {routeList.map((item) => {
            const { layout: Layout, routes = [], name } = item;
            return (
              <Route element={<Layout />} key={name}>
                {routes.map((route) => {
                  const { title, path, component: Component, redirect } = route;
                  if (redirect)
                    return (
                      <Route
                        key={title}
                        path={path}
                        element={<Navigate to={redirect} />}
                      />
                    );
                  return (
                    <Route
                      key={title}
                      path={path}
                      element={
                        <Suspense fallback={<PageLoading />}>
                          <Helmet>
                            <title>{title}</title>
                          </Helmet>
                          <Component />
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
