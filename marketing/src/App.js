import React from "react";
import {
  Routes,
  Route,
  Router,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
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
        <HistoryRouter history={history} basename="/marketing">
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/:id" element={<PricingDetail />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </HistoryRouter>
      </StylesProvider>
    </div>
  );
};