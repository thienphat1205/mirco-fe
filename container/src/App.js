import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoading from "./components/PageLoading";
import routeList from "./config/routes";
import store from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<PageLoading />}>
        <Main />
      </React.Suspense>
    </Provider>
  );
};

const Main = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {routeList.map((item) => {
            const { routes, layout: Layout, key } = item;
            return (
              <Route element={<Layout />} key={key}>
                {routes.map((element) => {
                  const {
                    exact,
                    path,
                    key,
                    redirect,
                    component: Component,
                  } = element;
                  return (
                    <Route
                      exact={exact}
                      path={path}
                      key={key}
                      element={
                        redirect ? (
                          <Navigate to={redirect} />
                        ) : (
                          <Component store={store} />
                        )
                      }
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
