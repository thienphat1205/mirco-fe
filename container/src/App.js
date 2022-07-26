import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthorCodeLayout from "./components/AuthorCodeLayout";
import KtcLcApp from "./components/KtcLcApp";
import MainLayout from "./components/MainLayout";
import AuthorCode from "./pages/AuthorCode";
import store from "./state/store";
import { lazy } from "react";
const QlclApp = lazy(() => import("./components/QlclApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path={["/", "/ktc-lc"]}>
                <MainLayout>
                  <Switch>
                    <Route exact path="/">
                      <Redirect to="/ktc-lc" />
                    </Route>
                    <Route path="/ktc-lc" component={KtcLcApp} />
                    <Route path="/qlcl" component={QlclApp} />
                  </Switch>
                </MainLayout>
              </Route>
              <Route path="/sso-login-v2">
                <AuthorCodeLayout>
                  <Switch>
                    <Route path="/sso-login-v2" component={AuthorCode} />
                  </Switch>
                </AuthorCodeLayout>
              </Route>
            </Switch>
          </Suspense>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  );
};
