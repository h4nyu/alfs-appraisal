import React from "react";
import WorkspacePage from "./WorkspacePage";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { Workspace } from "@sivic/core/workspace";
import Tag from "@sivic/core/tag"
import Point from "@sivic/core/point"
export default {
  title: "pages/WorkspacePage",
  component: WorkspacePage,
  decorators: [(Story) => (
    <Router >
      <div style={{height: 500}}>
        <Story/>
      </div>
    </Router>
  )]
};


export const Primary = (args) => <WorkspacePage /> 
