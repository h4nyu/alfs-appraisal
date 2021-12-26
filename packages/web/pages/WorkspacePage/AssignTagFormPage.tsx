import React from "react"
import AssignTagFormView from '@sivic/web/components/AssignTagForm'
import Modal from "@sivic/web/components/Modal"
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import api, { batchFetchBoxes, batchFetchFiles } from "@sivic/web/api"
import store from "@sivic/web/store"
import Loading from "@sivic/web/components/Loading"

const Page = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  if(!workspaceId){
    return null
  }
  const { data:images } = useSWR(`${workspaceId}/images`, async () => api.image.filter({workspaceId}))
  if(images instanceof Error) { return null }
  const { data:boxes } = useSWR(`${workspaceId}/boxes`, async () => batchFetchBoxes())
  if(boxes instanceof Error) { return null }
  const { data:files } = useSWR(() => boxes?.map(x => x.fileId), batchFetchFiles)
  if(files instanceof Error) { return null }
  const { data:tags } = useSWR(`${workspaceId}/tags`, async () => api.tag.filter({workspaceId}))
  if(tags instanceof Error) { return null }
  if(
    tags === undefined || images === undefined 
  ) {
    return <Loading/>
  }

  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <AssignTagFormView 
        tagId={store.assignTagForm.tagId}
        boxes={boxes}
        tags={tags}
        files={files}
        onBoxClick={store.assignTagForm.assign}
        onTagChange={t => store.assignTagForm.setTagId(t?.id)}
      />
    </Modal>
  );
};
export default Page;
