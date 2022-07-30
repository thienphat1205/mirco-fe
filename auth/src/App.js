import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter basename="/auth">
          <Routes>
            <Route path="/signin" element={<Signin onSignIn={onSignIn} />} />
            <Route path="/signup" element={<Signup onSignIn={onSignIn} />} />
          </Routes>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
};
