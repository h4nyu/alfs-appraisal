import React from "react"
import TagFormView from '@alfs-appraisal/web/components/TagForm'
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import Modal from "@alfs-appraisal/web/components/Modal"
import Loading from "@alfs-appraisal/web/components/Loading"
import api, { batchFetchFiles,} from "@alfs-appraisal/web/api"

const Page = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const tagId = searchParams.get("tagId")
  if(!workspaceId){
    return null
  }
  const { data:workspace } = useSWR({key:"workspace", id: workspaceId}, api.workspace.find)
  if(workspace instanceof Error) { return null }
  const { data:tag } = useSWR(tagId && {key:"tag", id: tagId}, api.tag.find)
  if(tag instanceof Error) { return null }
  const { data:boxes } = useSWR(tagId && {key:"box", tagId}, api.box.filter)
  if(boxes instanceof Error) { return null }
  const { data:files } = useSWR({key: 'file', boxes }, batchFetchFiles)
  if(files instanceof Error) { return null }
  if(workspace === undefined){
    return <Loading/>
  }

  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <TagFormView 
        workspace={workspace}
        tag={tag}
        boxes={boxes}
        files={files}
        // summaryPairs={store.tagForm.summaryPairs}
        // onBoxClick={box => {
        //   if(box.tagId === undefined) { return }
        //   store.featureForm.init(box)
        //   navigate("/workspace/point")
        // }}
        onSubmit={async (v) => {
          const { id } = v
          if(id !== undefined){
            await api.tag.update({...v, id, workspaceId})
          }else{
            await api.tag.create({...v, workspaceId})
            navigate(-1)
          }
          mutate({key:"tag", workspaceId})
        }}
        // onDelete={store.tagForm.delete}
      />
    </Modal>
  );
};
export default Page;
