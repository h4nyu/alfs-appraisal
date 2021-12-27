import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReferenceForm from "@alfs-appraisal/web/components/ReferenceForm"
import Modal from "@alfs-appraisal/web/components/Modal"
import Loading from "@alfs-appraisal/web/components/Loading"
import useSWR, { useSWRConfig } from 'swr'
import api from "@alfs-appraisal/web/api"

const Page = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const boxId = searchParams.get("boxId")
  if(!workspaceId || !boxId){
    return null
  }
  const navigate = useNavigate()
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
  if(box === undefined || tag === undefined){
    return <Loading/>
  }
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
          if(pErr instanceof Error) { return }
          mutatePoints()
          const lErr = await api.line.load({
            boxId: box.id,
            lines:v.lines,
          })
          if(lErr instanceof Error) { return }
          mutateLines()
        }}
      />
    </Modal>
  );
};

export default Page;
