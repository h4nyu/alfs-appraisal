import React, { Suspense, lazy } from "react";
import { observer } from "mobx-react-lite";
import { Router, Switch, Route } from "react-router-dom";
import rootStore from "./store";
import Toast from "./connectors/Toast";
import { createHashHistory } from "history";
import PageLayout from "@sivic/web/components/PageLayout";
import Header from "@sivic/web/components/Header";
import Loading_ from "@sivic/web/components/Loading"

const history = createHashHistory();
const MainPage = lazy(() => import("@sivic/web/pages/MainPage"));
const WorkspacePage = lazy(() => import("@sivic/web/pages/WorkspacePage"));
const Loading = observer(() => <Loading_ isActive={rootStore.loadingStore.isActive}/>)

export default function App() {
  React.useEffect(() => {
    rootStore.init();
    history.push("/");
  });
  return (
    <>
      <Router history={history}>
        <Loading />
        <Toast />
        <PageLayout
          header={<Header/>}
          content={
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path={"/"} component={MainPage} />
              <Route path={"/workspace"} component={WorkspacePage} />
            </Suspense>
          }
        />
      </Router>
    </>
  );
}
