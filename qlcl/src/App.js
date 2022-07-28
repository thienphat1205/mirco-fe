import PageLoading from "@/components/PageLoading";
import routeList from "@/config/routes";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.less";
import ticketReducer from "./state/reducers/ticketReducer";
import { store as RelatedStore } from "./state/store";

const App = (props) => {
  const { store = RelatedStore, history } = props;

  useEffect(() => {
    // add state ticked to parent reducer
    store.injectReducer("ticket", ticketReducer);
  }, []);

  return (
    <Provider store={store || {}}>
      <Main history={history} />
    </Provider>
  );
};

const Main = ({ history }) => {
  return (
    <BrowserRouter history={history} basename="/qlcl">
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
  );
};

export default App;
