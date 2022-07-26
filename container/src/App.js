import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const KtcLcApp = lazy(() => import("./components/KtcLcApp"));
const QlclApp = lazy(() => import("./components/QlclApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/ktc-lc" />
              </Route>
              <Route path="/ktc-lc" component={KtcLcApp} />
              <Route path="/qlcl" component={QlclApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
