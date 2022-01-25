import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReferenceForm from "@alfs-appraisal/web/components/ReferenceForm"
import Modal from "@alfs-appraisal/web/components/Modal"
import Loading from "@alfs-appraisal/web/components/Loading"
import useSWR, { useSWRConfig } from 'swr'
import useToast from "@alfs-appraisal/web/hooks/useToast"
import api, { batchFetchBoxes, batchFetchPoints} from "@alfs-appraisal/web/api"

const Page = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useSWRConfig()
  const workspaceId = searchParams.get("workspaceId")
  const boxId = searchParams.get("boxId")
  if(!workspaceId || !boxId){
    return null
  }
  const { data:box } = useSWR({key:"box", id: boxId}, api.box.find)
  if(box instanceof Error) { return null }
  const { data:tag } = useSWR(box?.tagId && {key:"tag", id: box.tagId}, api.tag.find)
  if(tag instanceof Error) { return null }
  const { data:file } = useSWR(box?.fileId && {key:"file", id: box.fileId}, api.file.find)
  if(file instanceof Error) { return null }

  const { data:points, mutate: mutatePoints } = useSWR(box?.id && {key:"point", boxId: box.id}, api.point.filter)
  if(points instanceof Error) { return null }
  const { data:lines, mutate:mutateLines } = useSWR(box?.id && {key:"line", boxId: box.id}, api.line.filter)
  if(lines instanceof Error) { return null }

  const { data:images } = useSWR({key:"image", workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:boxes } = useSWR({ key:'box', images }, batchFetchBoxes)
  if(boxes instanceof Error) { return null }


  if(box === undefined || 
     tag === undefined || 
     lines === undefined || 
     points === undefined || 
     boxes === undefined
    ){
    return <Loading/>
  }
  console.log(boxes)
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <ReferenceForm 
        box={box}
        tag={tag}
        file={file}
        points={points}
        lines={lines}
        onSubmit={async (v) => {
          const pErr = await api.point.load({
            boxId: box.id,
            points:v.points,
          })
          if(pErr instanceof Error) { return toast.error(pErr.message) }
          mutatePoints(pErr)
          const lErr = await api.line.load({
            boxId: box.id,
            lines:v.lines,
          })
          if(lErr instanceof Error) { return toast.error(lErr.message)}
          mutateLines(lErr)
          toast.info('Success')
          boxes.forEach( x => {
            mutate({key:"point", boxId: x.id})
            console.log(x.id)
          })
          mutate({key:"point", boxes})
          navigate(-1)
        }}
      />
    </Modal>
  );
};

export default Page;
