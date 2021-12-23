import React, { Suspense, lazy } from "react";
import { observer } from "mobx-react-lite";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import rootStore from "./store";
import Toast from "./connectors/Toast";
import PageLayout from "@sivic/web/components/PageLayout";
import Header from "@sivic/web/components/Header";
import Loading_ from "@sivic/web/components/Loading"

const MainPage = lazy(() => import("@sivic/web/pages/MainPage"));
const WorkspacePage = lazy(() => import("@sivic/web/pages/WorkspacePage"));
const Loading = observer(() => <Loading_ isActive={rootStore.loadingStore.isActive}/>)

export const App = () => {
  return (
    <Router>
      <Routes>
        <Loading />
        <Toast />
        <PageLayout
          header={<Header/>}
          content={
            <Suspense fallback={<div>Loading...</div>}>
              <Route path={"/"} element={<MainPage/>} />
              <Route path={"/workspace"} element={<WorkspacePage/>} />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
export default App
