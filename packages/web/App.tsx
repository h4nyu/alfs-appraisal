import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "@alfs-appraisal/web/components/PageLayout";
import Header from "@alfs-appraisal/web/components/Header";
import Loading_ from "@alfs-appraisal/web/components/Loading"

const MainPage = lazy(() => import("@alfs-appraisal/web/pages/MainPage"));
const WorkspacePage = lazy(() => import("@alfs-appraisal/web/pages/WorkspacePage"));
const CreateWorkspacePage = lazy(() => import("@alfs-appraisal/web/pages/CreatePage"));
const NotFoundPage = lazy(() => import("@alfs-appraisal/web/pages/NotFoundPage"));

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
              <Route path={"/create/workspace"} element={<CreateWorkspacePage/>} />
              <Route path={"/workspace/*"} element={<WorkspacePage/>} />
              <Route path={"*"} element={<NotFoundPage/>} />
            </Routes>
          </Suspense>
        }
      />
    </Router>
  );
}
