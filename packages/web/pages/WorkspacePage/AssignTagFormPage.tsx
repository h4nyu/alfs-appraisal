import React from "react"
import AssignTagFormView from '@alfs-appraisal/web/components/AssignTagForm'
import Modal from "@alfs-appraisal/web/components/Modal"
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import api, { batchFetchBoxes, batchFetchFiles } from "@alfs-appraisal/web/api"
import Loading from "@alfs-appraisal/web/components/Loading"
import useToast from "@alfs-appraisal/web/hooks/useToast"

const Page = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  if(!workspaceId){
    return null
  }
  const { data:images } = useSWR({key:'image', workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:boxes, mutate: mutateBoxes } = useSWR({ key:'box', images }, batchFetchBoxes)
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
        boxes={boxes}
        tags={tags}
        files={files}
        onSubmit={async (box) => {
          const res = await api.box.update({box})
          if(res instanceof Error){
            return toast.error(res.message)
          }
          mutateBoxes()
        }}
      />
    </Modal>
  );
};
export default Page;
