import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const KtcLcApp = lazy(() => import("./components/KtcLcApp"));
const QlclApp = lazy(() => import("./components/QlclApp"));

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/ktc-lc" />} />
        <Route
          path="/ktc-lc/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <KtcLcApp />
            </Suspense>
          }
        />
        <Route
          path="/qlcl/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <QlclApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
