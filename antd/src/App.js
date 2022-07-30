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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<TestAntd />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
