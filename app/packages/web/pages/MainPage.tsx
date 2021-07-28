import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import WorkspaceTable from "@sivic/web/components/WorkspaceTable";
import store from "@sivic/web/store";

const Content = observer(() => {
  const { workspaceStore, workspaceForm, history } = store;
  React.useEffect(() => {
    workspaceForm.init()
  },[workspaceStore.workspaces])
  return (
    <div
      className="box"
      style={{
        height:"100%",
        overflow: "scroll",
      }}
    >
      <WorkspaceTable
        name={workspaceForm.name}
        onNameChange={workspaceForm.setName}
        workspaces={workspaceStore.workspaces.toList().toArray()} 
        onClick={(id) => {
          workspaceForm.init(id)
          history.push("/workspace")
        }} 
        onCreate={() => {
          workspaceForm.init()
          history.push("/workspace")
        }} 
        onDelete={(id) => workspaceForm.delete(id)} 
      />
    </div>
  );
});

export default Content;
