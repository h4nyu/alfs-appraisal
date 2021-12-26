import React from "react";
import Component from "./";
import { Workspace } from "@sivic/core/workspace"

export default {
  title: "WorkspaceForm",
  component: Component,
};

const workspace = Workspace()
export const Default = (args) => <Component 
  {...args} 
  workspace={workspace}
/>

