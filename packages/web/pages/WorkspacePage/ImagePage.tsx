import React, { useState, useEffect } from "react";
import useModal from "@alfs-appraisal/web/hooks/useModal"
import BoxForm from "@alfs-appraisal/web/components/BoxForm"
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import { Image } from "@alfs-appraisal/core/image"
import Modal from "@alfs-appraisal/web/components/Modal"
import api from "@alfs-appraisal/web/api"
import Loading from "@alfs-appraisal/web/components/Loading"

const Page = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const imageId = searchParams.get("imageId")
  if(!workspaceId || !imageId){
    return null
  }
  const { data:images } = useSWR({key:"image", workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:image } = useSWR({key:"image", id: imageId}, api.image.find)
  if(image instanceof Error) { return null }
  const { data:file } = useSWR(image?.fileId && {key: 'file', id: image.fileId}, api.file.find)
  if(file instanceof Error) { return null }
  const { data:boxes, mutate:mutateBoxes } = useSWR(image && {key:"box", imageId: image.id}, api.box.filter)
  if(boxes instanceof Error) { return null }

  if(image === undefined || file === undefined || boxes === undefined){
    return <Loading/>
  }
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <BoxForm 
        image={image}
        file={file}
        boxes={boxes}
        onSave={async ({boxes}) => {
          const res = await api.box.load({
            imageId,
            boxes,
          })
          if(res instanceof Error) { return }
          mutateBoxes(res)
          mutate({
            key:"box",
            images,
          })
          navigate(-1)
        }}
        onDelete={async () => {
          await api.image.delete({id: image.id})
          mutate({
            key:"image",
            workspaceId,
          })
          navigate(-1)
        }}
        onDetect={async () => {
          const res = await api.detect.box({data: file.data}) 
          if(res instanceof Error) { return [] }
          return res
        }}
        onSaveImage={async ({name}) => {
          await api.image.update(Image({...image, name}))
          mutate({
            key:"image",
            workspaceId,
          })
        }}
      />
    </Modal>
  );
};

export default Page;
