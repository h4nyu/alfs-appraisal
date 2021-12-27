import React, { useState, useEffect } from "react";
import store from "@sivic/web/store";
import PointForm from "@sivic/web/components/PointForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import Modal from "@sivic/web/components/Modal"
import api from "@sivic/web/api"
import Loading from "@sivic/web/components/Loading"
import ReferenceForm from "@sivic/web/components/ReferenceForm"

const Page = () => {
  const { featureForm, workspaceForm } = store;
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
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
  if(box === undefined || tag === undefined){
    return <Loading/>
  }
  const isReference = box.id === tag.referenceBoxId
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
       <PointForm 
          box={box}
          tag={tag}
          file={file}
          points={featureForm.points}
          referenceFile={featureForm.referenceFile}
          referencePoints={featureForm.referencePoints}
          referenceLines={featureForm.referenceLines}
          lines={featureForm.lines}
          onSave={featureForm.save}
          onDelete={featureForm.delete}
          onReset={featureForm.resetPoints}
        />
    </Modal>
  );
};

export default Page;
