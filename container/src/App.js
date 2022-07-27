// import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
// import { Suspense } from "react";
// import "./App.less";
// import PageLoading from "@/components/PageLoading";
// import { Helmet } from "react-helmet";
// import routeList from "@/config/routes";
// import { Provider } from "react-redux";
// import store from "./state/store";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           {routeList.map((item) => {
//             const { layout: Layout, routes = [], name } = item;
//             return (
//               <Route element={<Layout />} key={name}>
//                 {routes.map((route) => {
//                   const { title, path, component: Component, redirect } = route;
//                   if (redirect)
//                     return (
//                       <Route
//                         key={title}
//                         path={path}
//                         element={<Navigate to={redirect} />}
//                       />
//                     );
//                   return (
//                     <Route
//                       key={title}
//                       path={path}
//                       element={
//                         <Suspense fallback={<PageLoading />}>
//                           <Helmet>
//                             <title>{title}</title>
//                           </Helmet>
//                           <Component />
//                         </Suspense>
//                       }
//                     />
//                   );
//                 })}
//               </Route>
//             );
//           })}
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// export default App;

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthorCodeLayout from "@/layouts/AuthorCodeLayout";
const AuthorCode = lazy(() => import("@/pages/AuthorCode"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QlclApp = lazy(() => import("@/components/QlclApp"));
const KtcLcApp = lazy(() => import("@/components/KtcLcApp"));

import { Provider } from "react-redux";
import store from "./state/store";

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthorCodeLayout />}>
            <Route
              path="/sso-login-v2"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AuthorCode />
                </Suspense>
              }
            />
          </Route>
          <Route element={<MainLayout />}>
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
    </Provider>
  );
};
