import React, { useState } from "react"; 
import { observer } from "mobx-react-lite";
import FileUpload from "@sivic/web/components/FileUpload";
import DownloadBtn from "@sivic/web/components/DownloadBtn"
import { Image } from "@sivic/core/image";
import { File } from "@sivic/core/file"
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import ImageTable from "@sivic/web/components/ImageTable"
import ImageTags from "@sivic/web/components/ImageTags";
import BoxView from "@sivic/web/components/BoxView"
import TagTable from "@sivic/web/components/TagTable"
import TagSelector from "@sivic/web/components/TagSelector"
import { Router, Routes, Route, NavLink, Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import api, { batchFetchFiles, batchFetchBoxes, batchFetchPoints} from "@sivic/web/api"
import { readAsBase64, b64toBlob } from "@sivic/web/utils";
import WorkspaceForm from "@sivic/web/components/WorkspaceForm"

import ImagePage from "./ImagePage"
import BoxPage from "./BoxPage"
import TagFormPage from "./TagFormPage"
import ReferenceBoxPage from "./ReferenceBoxPage"
import AssignTagFormPage from "./AssignTagFormPage"
import useSWR, { useSWRConfig } from 'swr'
import Loading from "@sivic/web/components/Loading"


const Page = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId")
  if(!workspaceId){
    return null
  }
  const { data:workspace } = useSWR({
    key:"workspace",
    id: workspaceId
  }, api.workspace.find)
  if(workspace instanceof Error) { return null }
  const { data:images } = useSWR({key:"image", workspaceId}, api.image.filter)
  if(images instanceof Error) { return null }
  const { data:tags } = useSWR({key:"tag", workspaceId}, api.tag.filter)
  if(tags instanceof Error) { return null }
  const { data:boxes } = useSWR({ key:'box', images }, batchFetchBoxes)
  if(boxes instanceof Error) { return null }
  const { data:points } = useSWR({ key:'point', boxes }, batchFetchPoints)
  if(points instanceof Error) { return null }
  const { data:files } = useSWR({key: 'file', images, boxes }, batchFetchFiles)
  if(files instanceof Error) { return null }
  if(
    workspace === undefined  ||
    images === undefined ||
    tags === undefined
  ) {
    return <Loading/>
  }

  return (
    <div
      className="box"
    >
      <WorkspaceForm 
        workspace={workspace} 
        onSubmit={async (w) => {
          await api.workspace.update(w)
          mutate({
            key: "workspace",
            id: workspaceId,
          })
        }} 
      />
      <div
        style={{
          overflow: "auto"
        }}
      >
        <TagTable  
          onAddImage={async (files) => {
            for (const f of files) {
              if (!f.type.includes("image")) {
                continue;
              }
              const data = await readAsBase64(f);
              if (data instanceof Error) {
                continue;
              }
              await api.image.create({ 
                data, name:f.name, workspaceId
              });
            }
            mutate({
              key: "image",
              workspaceId,
            })
          }}
          onAddTag={() => {
            navigate({
              pathname:"/workspace/tag",
              search: createSearchParams({
                workspaceId,
              }).toString()
            })
          }}
          images={images}
          tags={tags}
          files={files}
          boxes={boxes}
          points={points}
          onImageClick={image => {
            navigate({
              pathname: `/workspace/image`,
              search: createSearchParams({
                workspaceId,
                imageId: image.id,
              }).toString()
            })
          }}
          onTagClick={tag => {
            navigate({
              pathname:"/workspace/tag",
              search: createSearchParams({
                workspaceId,
                tagId: tag.id,
              }).toString()
            })
          }}
          onBoxClick={async (box) => {
            if(box.tagId === undefined) { return }
            const tag = tags.find(x => x.id === box.tagId)
            if(tag?.referenceBoxId === box.id){
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
                }).toString()
              })
            }
          }}
          onAssignClick={() => {
            navigate({
              pathname: "/workspace/assign-tag",
              search: createSearchParams({
                workspaceId,
              }).toString()
            })
          }}
        />
      </div>
      <Routes>
        <Route path={"image"} element={<ImagePage />}/>
        <Route path={"assign-tag"} element={<AssignTagFormPage/>}/>
        <Route path={"box"} element={<BoxPage/>}/>
        <Route path={"reference-box"} element={<ReferenceBoxPage />}/>
        <Route path={"tag"} element={<TagFormPage/>}/>
      </Routes>
    </div>
  );
};

export default Page;
