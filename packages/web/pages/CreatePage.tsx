import React, { useState } from "react"; 
import FileUpload from "@alfs-appraisal/web/components/FileUpload";
import Workspace from "@alfs-appraisal/core/workspace"
import { Router, Routes, Route, NavLink, Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import api, { batchFetchFiles, batchFetchBoxes, batchFetchPoints} from "@alfs-appraisal/web/api"
import { readAsBase64, b64toBlob } from "@alfs-appraisal/web/utils";
import WorkspaceForm from "@alfs-appraisal/web/components/WorkspaceForm"
import useSWR, { useSWRConfig } from 'swr'
import Loading from "@alfs-appraisal/web/components/Loading"
import useToast from "@alfs-appraisal/web/hooks/useToast"


const Page = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspace = Workspace()
  const toast = useToast();

  return (
    <div
      className="box"
    >
      <WorkspaceForm 
        workspace={workspace} 
        onSubmit={async (w) => {
          const res = await api.workspace.create(w)
          if(res instanceof Error){ 
            return toast.error(res.message)
          }
          toast.info('Success')
          navigate({
            pathname:"/workspace",
            search:createSearchParams({workspaceId:w.id}).toString(),
          })
        }} 
      />
    </div>
  );
};

export default Page;
