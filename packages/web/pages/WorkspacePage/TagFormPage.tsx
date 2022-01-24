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
  const { data:images } = useSWR({key:"image", workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:tag } = useSWR(tagId && {key:"tag", id: tagId}, api.tag.find)
  if(tag instanceof Error) { return null }
  const { data:boxes } = useSWR(tagId && {key:"box", tagId}, api.box.filter)
  if(boxes instanceof Error) { return null }
  const { data:files } = useSWR({key: 'file', boxes }, batchFetchFiles)
  if(files instanceof Error) { return null }
  const { data:referenceLines } = useSWR(tag?.referenceBoxId && {key:"line", boxId: tag?.referenceBoxId}, api.line.filter)
  if(referenceLines instanceof Error) { return null }
  const { data:points } = useSWR({ key:'point', boxes }, batchFetchPoints)
  if(points instanceof Error) { return null }

  if(workspace === undefined ||
     tag === undefined
    ){
    return <Loading/>
  }
  const { summaryPairs } = useSummaryPairs({
    boxes,
    referenceLines,
    points,
  })

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
        tag={tag}
        boxes={boxes}
        files={files}
        summaryPairs={summaryPairs}
        onBoxClick={box => {
          const referenceBoxId = tag?.referenceBoxId
          if(!referenceBoxId) { return }
          if(referenceBoxId === box.id){
            navigate({
              pathname:"/workspace/reference-box",
              search: createSearchParams({
                workspaceId,
                boxId: box.id,
              }).toString()
            })
          }else{
            navigate({
              pathname:"/workspace/box",
              search: createSearchParams({
                workspaceId,
                boxId: box.id,
                referenceBoxId: referenceBoxId,
              }).toString()
            })
          }
        }}
        onSubmit={async (v) => {
          const { id } = v
          if(id !== undefined){
            const uErr = await api.tag.update({...v, id, workspaceId})
            if(uErr instanceof Error) {return toast.error(uErr.message)}
          }
          mutate({key:"tag", workspaceId})
          toast.info('Success')
          navigate(-1)
        }}
        onDelete={tag && (async () => {
          const res = await api.tag.delete({id: tag.id})
          if(res instanceof Error) { return toast.error(res.message) }
          mutate({key: 'tag', workspaceId})
          mutate({key: 'box', images})
          toast.info('Success')
          navigate(-1)
        })}
      />
    </Modal>
  );
};
export default Page;
