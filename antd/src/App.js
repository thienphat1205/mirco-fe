import React, { lazy, Suspense } from "react";
import "./App.less";
// import TestAntd from "./pages/TestAntd";
// import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
const TestAntd = lazy(() => import("./pages/TestAntd"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default ({ history }) => {
  return (
    <BrowserRouter basename="/antd">
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TestAntd />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
