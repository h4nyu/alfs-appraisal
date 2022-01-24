import React from "react"
import TagFormView from '@alfs-appraisal/web/components/TagForm'
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import Modal from "@alfs-appraisal/web/components/Modal"
import Loading from "@alfs-appraisal/web/components/Loading"
import api, { batchFetchFiles, batchFetchPoints, } from "@alfs-appraisal/web/api"
import { useSummaryPairs } from "@alfs-appraisal/web/hooks/useSummaryPairs"
import useToast from "@alfs-appraisal/web/hooks/useToast"
import SummaryTable from "@alfs-appraisal/web/components/SummaryTable"

const Page = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const tagId = searchParams.get("tagId")
  if(!workspaceId){
    return null
  }
  const { data:workspace } = useSWR({key:"workspace", id: workspaceId}, api.workspace.find)
  if(workspace instanceof Error) { return null }
  if(workspace === undefined){
    return <Loading/>
  }

  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <TagFormView 
        style={{
          width: "90vw",
        }}
        workspace={workspace}
        onSubmit={async (v) => {
          const { id } = v
          const cErr = await api.tag.create({...v, workspaceId})
          if(cErr instanceof Error) {return toast.error(cErr.message)}
          mutate({key:"tag", workspaceId})
          toast.info('Success')
          navigate(-1)
        }}
      />
    </Modal>
  );
};
export default Page;
