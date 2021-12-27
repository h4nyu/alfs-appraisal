import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "@alfs-appraisal/web/components/PageLayout";
import Header from "@alfs-appraisal/web/components/Header";
import Loading_ from "@alfs-appraisal/web/components/Loading"

const MainPage = lazy(() => import("@alfs-appraisal/web/pages/MainPage"));
const WorkspacePage = lazy(() => import("@alfs-appraisal/web/pages/WorkspacePage"));

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
