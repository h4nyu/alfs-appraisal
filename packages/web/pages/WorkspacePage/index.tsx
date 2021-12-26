import React, { useState } from "react"; 
import { observer } from "mobx-react-lite";
import FileUpload from "@sivic/web/components/FileUpload";
import store from "@sivic/web/store";
import DownloadBtn from "@sivic/web/components/DownloadBtn"
import { Image } from "@sivic/core/image";
import ImageTable from "@sivic/web/components/ImageTable"
import ImageTags from "@sivic/web/components/ImageTags";
import BoxView from "@sivic/web/components/BoxView"
import TagTable from "@sivic/web/components/TagTable"
import TagSelector from "@sivic/web/components/TagSelector"
import { Router, Routes, Route, NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "@sivic/web/api"
import WorkspaceForm from "@sivic/web/components/WorkspaceForm"

import PointPage from "./PointPage"
import BoxPage from "./BoxPage"
import TagFormPage from "./TagFormPage"
import RefLinePage from "./RefLinePage"
import AssignTagFormPage from "./AssignTagFormPage"
import useSWR, { useSWRConfig } from 'swr'
import Loading from "@sivic/web/components/Loading"

const Page = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig()
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("id")
  if(!workspaceId){
    return null
  }
  const { data:workspace, error } = useSWR(`/workspace/${workspaceId}`, async () => api.workspace.find({id: workspaceId}))
  if(workspace === undefined || workspace instanceof Error) {
    return <Loading/>
  }

  const { 
    workspaceForm, 
    imageProcess, 
    workspaceStore, 
    imageStore, 
    boxStore,
    fileStore,
    tagForm
  } = store

  const { save } = store.workspaceForm;
  const routes = [
    // {
    //   path: "/workspace/box",
    //   name: "Box",
    //   Component: BoxPage,
    // },
    // {
    //   path: "/workspace/assign-tag",
    //   name: "Assign Tag",
    //   Component: AssignTagFormPage,
    // },
    // {
    //   path: "/workspace/tag",
    //   name: "Tag",
    //   Component: TagFormPage,
    // },
    // {
    //   path: "/workspace/point",
    //   name: "Point",
    //   Component: PointPage,
    // },
    // {
    //   path: "/workspace/line",
    //   name: "RefLinePage",
    //   Component: RefLinePage,
    // },
  ]
  return (
    <div
      className="box"
    >
      <WorkspaceForm 
        workspace={workspace} 
        onSubmit={async (w) => {
          await api.workspace.update(w)
          mutate(`/workspace/${workspaceId}`)
        }} 
      />
      {
        workspaceForm.id && <>
          <div
            style={{
              overflow: "auto"
            }}
          >
            <TagTable  
              onAddImage={store.imageForm.uploadFiles}
              onAddTag={() => {
                store.tagForm.init({workspaceId: workspaceForm.id})
                navigate("/workspace/tag")
              }}
              images={workspaceForm.images}
              tags={workspaceForm.tags}
              files={fileStore.files}
              boxes={store.boxStore.boxes}
              points={store.pointStore.points}
              onImageClick={image => {
                store.imageProcess.init(image.id)
                navigate("/workspace/box")
              }}
              onTagClick={tag => {
                store.tagForm.init({id: tag.id, workspaceId: workspaceForm.id})
                navigate("/workspace/tag")
              }}
              onBoxClick={async (box) => {
                if(box.tagId === undefined) { return }
                await store.featureForm.init(box)
                if(store.featureForm.isReference){
                  navigate("/workspace/line")
                }else{
                  navigate("/workspace/point")
                }
              }}
              onAssignClick={() => {
                navigate("/workspace/assign-tag")
              }}
            />
          </div>
          {/* <Routes> */}
          {/*   { */}
          {/*     routes.map(r => { */}
          {/*       return ( */}
          {/*         <Route */} 
          {/*           key={r.path} */}
          {/*           path={r.path} */} 
          {/*         > */}
          {/*           <r.Component /> */}
          {/*         </Route> */}
          {/*       ) */}
          {/*     }) */}
          {/*   } */}
          {/* </Routes> */}
        </>
      }
    </div>
  );
};

export default Page;
