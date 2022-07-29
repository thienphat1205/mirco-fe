import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const AntdApp = lazy(() => import("./components/AntdApp"));
import Header from "./components/Header";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Routes>
              <Route path="/" element={<Navigate to="/marketing" />} />
              <Route
                path="/auth/*"
                element={<AuthLazy onSignIn={() => setIsSignedIn(true)} />}
              />
              <Route path="/marketing/*" element={<MarketingLazy />} />
              <Route path="/antd/*" element={<AntdApp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
