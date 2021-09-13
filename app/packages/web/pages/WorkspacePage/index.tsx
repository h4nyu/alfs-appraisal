import React, { useState } from "react"; import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import FileUpload from "@sivic/web/components/FileUpload";
import store from "@sivic/web/store";
import SaveBtn from "@sivic/web/components/SaveBtn"
import DownloadBtn from "@sivic/web/components/DownloadBtn"
import { Image } from "@sivic/core/image";
import ImageTable from "@sivic/web/components/ImageTable"
import ImageTags from "@sivic/web/components/ImageTags";
import BoxView from "@sivic/web/components/BoxView"
import TagTable from "@sivic/web/components/TagTable"
import TagSelector from "@sivic/web/components/TagSelector"
import { Router, Switch, Route, NavLink, Link, useLocation } from "react-router-dom";
import PointPage from "./PointPage"
import BoxPage from "./BoxPage"
import TagFormPage from "./TagFormPage"
import AssignTagFormPage from "./AssignTagFormPage"

const Content = observer(() => {
  const location = useLocation();
  const { 
    workspaceForm, 
    imageProcess, 
    workspaceStore, 
    imageStore, 
    boxStore,
    pointEditor,
    fileStore,
    tagForm
  } = store

  const { save } = store.workspaceForm;
  const routes = [
    {
      path: "/workspace/box",
      name: "Box",
      Component: BoxPage,
    },
    {
      path: "/workspace/assign-tag",
      name: "Assign Tag",
      Component: AssignTagFormPage,
    },
    {
      path: "/workspace/tag",
      name: "Tag",
      Component: TagFormPage,
      onClick: () => { tagForm.init({workspaceId: workspaceForm.id})}
    },
    {
      path: "/workspace/point",
      name: "Point",
      Component: PointPage,
    },
  ]
  return (
    <div
      className="box"
    >
      <div className="field">
        <label className="label">Name</label>
        <div className="field has-addons">
          <div className="control is-expanded" >
            <input 
              className="input" 
              type="text" 
              value={store.workspaceForm.name} 
              onChange={e => store.workspaceForm.setName(e.target.value)}
            />
          </div>
          <div className="control">
            <SaveBtn onClick={store.workspaceForm.save} />
          </div>
        </div>
      </div>
      {
        workspaceForm.id && <>
          <div
            style={{
              maxHeight: 300,
              overflow: "auto"
            }}
          >
            <TagTable  
              onAddImage={store.imageForm.uploadFiles}
              onAddTag={() => {
                store.tagForm.init({workspaceId: workspaceForm.id})
                store.history.push("/workspace/tag")
              }}
              images={workspaceForm.images}
              tags={workspaceForm.tags}
              files={fileStore.files}
              boxes={store.boxStore.boxes}
              points={store.pointStore.points}
              onImageClick={image => {
                store.imageProcess.init(image.id)
                store.history.push("/workspace/box")
              }}
              onTagClick={tag => {
                store.tagForm.init({id: tag.id, workspaceId: workspaceForm.id})
                store.history.push("/workspace/tag")
              }}
              onBoxClick={box => {
                if(box.tagId === undefined) { return }
                store.featureForm.init(box)
                store.history.push("/workspace/point")
              }}
            />
          </div>
          <div className="tabs is-boxed m-0">
            <ul>
              {
                routes.map(x => {
                  return (
                    <li 
                      key={x.path}
                      className={location.pathname === x.path ? "is-active" : ""}
                    >
                      <Link to={x.path} onClick={x.onClick}> {x.name} </Link> 
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Switch>
            {
              routes.map(r => {
                return (
                  <Route 
                    key={r.path}
                    path={r.path} 
                  >
                    <r.Component />
                  </Route>
                )
              })
            }
          </Switch>
        </>
      }
    </div>
  );
});

export default Content;
