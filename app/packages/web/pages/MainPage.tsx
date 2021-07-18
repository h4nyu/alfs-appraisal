import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import WorkspaceTable from "@sivic/web/components/WorkspaceTable";
import store from "@sivic/web/store";

const Content = observer(() => {
  const { workspaceStore, workspaceForm } = store;
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
        onSave={workspaceForm.save}
        workspaces={workspaceStore.workspaces.toList().toArray()} 
        onClick={(id) => workspaceForm.update(id)} 
        onDelete={(id) => workspaceForm.delete(id)} 
        onCreate={() => workspaceForm.create()}
      />
    </div>
  );
});

export default Content;
