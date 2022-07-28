import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import "./App.less";
import PageLoading from "@/components/PageLoading";
import { Helmet } from "react-helmet";
import routeList from "@/config/routes";
import { Provider } from "react-redux";
import store from "./state/store";

const App = ({ history }) => {
  console.log("history App QLCL", history);

  const AppRoute = ({
    component: Component,
    titlePage = "Title Page",
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Suspense fallback={<PageLoading />}>
            <>
              <Helmet>
                <title>{titlePage}</title>
              </Helmet>
              <Component {...props} />
            </>
          </Suspense>
        )}
      />
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter history={history} basename="/qlcl">
        <Switch>
          {routeList.map((item, index) => {
            const { layout: Layout, routes: subRoutes = [] } = item;
            const path = subRoutes.map((item) => item.path);
            console.log("subRoutes", subRoutes);
            return (
              <Route exact path={path} key={index}>
                <Layout>
                  <Switch>
                    {subRoutes.map((route) =>
                      !route.redirect ? (
                        <AppRoute
                          key={route.path}
                          path={route.path}
                          exact={route.path !== "*"}
                          component={route.component}
                          titlePage={route.title}
                        />
                      ) : (
                        <Route
                          exact={route.exact}
                          path={route.path}
                          key={route.path}
                        >
                          <Redirect to={route.redirect} />
                        </Route>
                      )
                    )}
                  </Switch>
                </Layout>
              </Route>
            );
          })}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
