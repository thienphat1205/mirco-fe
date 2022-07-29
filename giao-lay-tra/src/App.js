import PageLoading from "@/components/PageLoading";
import routeList from "@/config/routes";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.less";
import { store as RelatedStore } from "./state/store";

const App = (props) => {
  const { store = RelatedStore, history } = props;

  return (
    <Provider store={store || {}}>
      <Main history={history} />
    </Provider>
  );
};

const Main = ({ history }) => {
  return (
    <BrowserRouter history={history} basename="/giao-lay-tra">
      <Routes>
        {routeList.map((item) => {
          const { layout: Layout, routes = [], name } = item;
          return (
            <Route element={<Layout />} key={name}>
              {routes.map((route) => {
                const {
                  title,
                  path,
                  component: Component,
                  redirect,
                  subRoutes,
                } = route;
                if (redirect)
                  return (
                    <Route
                      key={title}
                      path={path}
                      element={<Navigate to={redirect} />}
                    />
                  );
                return subRoutes ? (
                  subRoutes.map((item) => {
                    const { component: SubComponent } = item;
                    return (
                      <Route
                        key={item?.title}
                        path={item?.path}
                        element={
                          <Suspense fallback={<PageLoading />}>
                            <Helmet>
                              <title>{item?.title}</title>
                            </Helmet>
                            <SubComponent />
                          </Suspense>
                        }
                      />
                    );
                  })
                ) : (
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
  );
};

export default App;
