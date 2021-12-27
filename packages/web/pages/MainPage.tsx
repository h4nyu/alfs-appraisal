import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";
import WorkspaceTable from "@sivic/web/components/WorkspaceTable";
import Loading from "@sivic/web/components/Loading"
import useSWR, { useSWRConfig } from 'swr'
import api from "@sivic/web/api"

const Page = () => {
  const navigate = useNavigate()
  const { data:workspaces, error } = useSWR({key:"workspace"}, api.workspace.filter)
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
        workspaces={workspaces} 
        onClick={(id) => {
          navigate({
            pathname:"/workspace",
            search:createSearchParams({workspaceId:id}).toString(),
          })
        }} 
        onCreate={() => {
          navigate("/workspace")
        }} 
        onDelete={async (id) => {
          mutate({key:"workspace"})
        }} 
      />
    </div>
  );
};

export default Page;
