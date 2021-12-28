import React, { useState, useEffect } from "react";
import Point, { ResizeFn } from "@alfs-appraisal/core/point"
import PointForm from "@alfs-appraisal/web/components/PointForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import Modal from "@alfs-appraisal/web/components/Modal"
import api from "@alfs-appraisal/web/api"
import Loading from "@alfs-appraisal/web/components/Loading"
import ReferenceForm from "@alfs-appraisal/web/components/ReferenceForm"

const Page = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const boxId = searchParams.get("boxId")
  const referenceBoxId = searchParams.get("referenceBoxId")
  if(!workspaceId || !boxId || !referenceBoxId){
    console.log('aaa')
    navigate(-1)
    return null
  }
  const { data:images } = useSWR({key:"image", workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:box } = useSWR({key:"box", id: boxId}, api.box.find)
  if(box instanceof Error) { return null }
  const { data:tag } = useSWR(box?.tagId && {key:"tag", id: box.tagId}, api.tag.find)
  if(tag instanceof Error) { return null }
  const { data:file } = useSWR(box?.fileId && {key:"file", id: box.fileId}, api.file.find)
  if(file instanceof Error) { return null }
  const { data:referenceBox } = useSWR({key:"box", id: referenceBoxId}, api.box.find)
  if(referenceBox instanceof Error) { return null }
  const { data:referenceFile } = useSWR(referenceBox?.fileId && {key:"file", id: referenceBox.fileId}, api.file.find)
  if(referenceFile instanceof Error) { return null }
  const { data:savedPoints, mutate: mutatePoints } = useSWR(box?.id && {key:"point", boxId: box.id}, api.point.filter)
  if(savedPoints instanceof Error) { return null }
  const { data:referencePoints } = useSWR({key:"point", boxId: referenceBoxId}, api.point.filter)
  if(referencePoints instanceof Error) { return null }
  const { data:referenceLines } = useSWR({key:"line", boxId: referenceBoxId}, api.line.filter)
  if(referenceLines instanceof Error) { return null }
  const { data:lines } = useSWR(box?.id && {key:"line", boxId: box.id}, api.line.filter)
  if(lines instanceof Error) { return null }


  if(
    box === undefined || 
    tag === undefined || 
    referenceBox === undefined ||
    referencePoints === undefined ||
    referenceFile === undefined ||
    savedPoints === undefined
  ){
    return <Loading/>
  }
  const resize = ResizeFn({source:referenceBox, target:box})
  const defaultPoints = referencePoints.map(p => Point({
    x:p.x,
    y:p.y,
    boxId,
    positionId: p.positionId,
  })).map(resize)
  const points = savedPoints.length === 0 ? defaultPoints : savedPoints
  console.log(points, defaultPoints)
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <PointForm 
        box={box}
        tag={tag}
        file={file}
        points={points}
        referenceFile={referenceFile}
        referencePoints={referencePoints}
        referenceLines={referenceLines}
        lines={lines}
        onSave={async (x) => {
          const res = await api.point.load({boxId, points:x.points})
          if(res instanceof Error) { return }
          mutatePoints(res)
        }}
        onDelete={async () => {
          await api.box.delete({id:boxId})
          mutate({key:"box", images})
          navigate(-1)
        }}
        onReset={() => {
          mutatePoints([...defaultPoints])
        }}
      />
    </Modal>
  );
};

export default Page;
