import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import useModal from "@sivic/web/hooks/useModal"
import BoxForm from "@sivic/web/components/BoxForm"
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from 'swr'
import { useParams } from "react-router-dom";
import { Image } from "@sivic/core/image"
import Modal from "@sivic/web/components/Modal"
import api from "@sivic/web/api"
import Loading from "@sivic/web/components/Loading"

const Page = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  const imageId = searchParams.get("imageId")
  if(!workspaceId || !imageId){
    return null
  }
  const { imageProcess } = store;
  const { data:image } = useSWR(imageId, async () => api.image.find({id:imageId}))
  if(image instanceof Error) { return null }
  const { data:file } = useSWR(() => image?.fileId, async (id) => api.file.find({id}))
  if(file instanceof Error) { return null }
  const { data:boxes } = useSWR(() => `${image?.id}/boxes`, async () => api.box.filter({imageId: image?.id}))
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
          await api.box.load({
            imageId: image.id,
            boxes,
          })
          mutate(`${image?.id}/boxes`)
        }}
        onDelete={async () => {
          await api.image.delete({id: image.id})
          mutate(`${workspaceId}/images`)
          navigate(-1)
        }}
        onDetect={async () => {
          const res = api.detect.box({data: file.data}) 
          if(res instanceof Error) { return [] }
          return []
        }}
        onSaveImage={async ({name}) => {
          await api.image.update(Image({...image, name}))
          mutate(image.id)
        }}
      />
    </Modal>
  );
};

export default Page;
