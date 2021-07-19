import React from "react";
import WorkspacePage from "./WorkspacePage";
import { Router, Switch, Route } from "react-router-dom";
import { createHashHistory } from "history";
import { Workspace } from "@sivic/core/workspace";
import store from "@sivic/web/store"
import Tag from "@sivic/core/tag"
const history = createHashHistory();
export default {
  title: "pages/WorkspacePage",
  component: WorkspacePage,
  decorators: [(Story) => (
    <Router history={history}>
      <div style={{height: 500}}>
        <Story/>
      </div>
    </Router>
  )]
};

const form = store.workspaceForm
form.setName("testname")
form.id = "w0"
const tags = [
  Tag({
    name: "t0",
    workspaceId: "w0"
  })
]

export const Primary = (args) => <WorkspacePage /> 
