import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import WorkspaceTable from "@sivic/web/components/WorkspaceTable";
import store from "@sivic/web/store";

const Content = observer(() => {
  const { workspaceStore, workspaceForm  } = store;
  const navigate = useNavigate()
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
        workspaces={workspaceStore.workspaces} 
        onClick={(id) => {
          workspaceForm.init(id)
          navigate("/workspace")
        }} 
        onCreate={() => {
          workspaceForm.init()
          navigate("/workspace")
        }} 
        onDelete={(id) => workspaceForm.delete(id)} 
      />
    </div>
  );
});

export default Content;
