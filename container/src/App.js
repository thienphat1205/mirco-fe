import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routeList from "./config/routes";
import store from "./state/store";

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routeList.map((item) => {
              const { routes, layout, key } = item;
              return (
                <Route element={layout} key={key}>
                  {routes.map((element) => {
                    const { exact, path, key, redirect, component } = element;
                    return (
                      <Route
                        exact={exact}
                        path={path}
                        key={key}
                        element={
                          redirect ? <Navigate to={redirect} /> : component 
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
    </Provider>
  );
};
