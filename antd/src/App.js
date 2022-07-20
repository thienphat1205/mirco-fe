import React from "react";
import "./App.less";
import TestAntd from "./pages/TestAntd";
import NotFound from "./pages/NotFound";
import { Switch, Route, BrowserRouter } from "react-router-dom";

export default ({ history }) => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" component={TestAntd} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
