import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import PricingDetail from "./components/PricingDetail";

const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/marketing" />
            </Route>
            <Route exact path="/marketing/pricing" component={Pricing} />
            <Route
              exact
              path="/marketing/pricing/:id"
              component={PricingDetail}
            />
            <Route path="/marketing" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
