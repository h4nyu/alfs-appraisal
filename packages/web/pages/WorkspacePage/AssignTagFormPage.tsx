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
  const { data:images } = useSWR({key:'image', workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:boxes } = useSWR({ key:'box', images }, batchFetchBoxes)
  if(boxes instanceof Error) { return null }
  const { data:files } = useSWR({key: 'file', images, boxes }, batchFetchFiles)
  if(files instanceof Error) { return null }
  const { data:tags } = useSWR({key:"tag", workspaceId}, api.tag.filter)
  if(tags instanceof Error) { return null }
  if( tags === undefined || images === undefined ) {
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
