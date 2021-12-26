import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import WorkspaceTable from "@sivic/web/components/WorkspaceTable";
import store from "@sivic/web/store";
import Loading from "@sivic/web/components/Loading"
import useSWR, { useSWRConfig } from 'swr'
import api from "@sivic/web/api"

const Page = () => {
  const { workspaceStore, workspaceForm  } = store;
  const navigate = useNavigate()
  const { data:workspaces, error } = useSWR('/workspaces', async () => api.workspace.filter({}))
  const { mutate } = useSWRConfig()
  if(workspaces === undefined || workspaces instanceof Error){
    return <Loading/>
  }
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
        workspaces={workspaces} 
        onClick={(id) => {
          navigate(`/workspace?id=${id}`)
        }} 
        onCreate={() => {
          workspaceForm.init()
          navigate("/workspace")
        }} 
        onDelete={async (id) => {
          await workspaceForm.delete(id)
          mutate("/workspaces")
        }} 
      />
    </div>
  );
};

export default Page;
