import React, { Suspense, lazy } from "react";
import { observer } from "mobx-react-lite";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "@sivic/web/components/PageLayout";
import Header from "@sivic/web/components/Header";
import Loading_ from "@sivic/web/components/Loading"

const MainPage = lazy(() => import("@sivic/web/pages/MainPage"));
const WorkspacePage = lazy(() => import("@sivic/web/pages/WorkspacePage"));

export default function App() {
  return (
    <Router>
      <PageLayout
        header={<Header/>}
        content={
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={"/"} element={<MainPage/>} />
              <Route path={"/workspaces"} element={<MainPage/>} />
              <Route path={"/workspace/*"} element={<WorkspacePage/>} />
            </Routes>
          </Suspense>
        }
      />
    </Router>
  );
}
