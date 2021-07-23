import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import FileUpload from "@sivic/web/components/FileUpload";
import store from "@sivic/web/store";
import {
  useParams
} from "react-router-dom";

import { Image } from "@sivic/core/image";
import ImageTable from "@sivic/web/components/ImageTable"
import ImageTags from "@sivic/web/components/ImageTags";
import BoxView from "@sivic/web/components/BoxView"
import TagTable from "@sivic/web/components/TagTable"


const Content = observer(() => {
  let { id } = useParams<{id:string}>();
  const { 
    workspaceForm, 
    imageProcess, 
    workspaceStore, 
    imageStore, 
    boxStore,
    pointEditor,
    fileStore,
  } = store

  const { save } = store.workspaceForm;
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr 110px",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="field" 
        style={{ 
          gridRow: "1",
          height: "100%",
        }}
      >
        <label className="label">Name</label>
        <div className="control" >
          <input 
            className="input" 
            type="text" 
            value={store.workspaceForm.name} 
            onChange={e => store.workspaceForm.setName(e.target.value)}
          />
        </div>
      </div>
      <div 
        style={{
          gridRow: "2"
        }}
      >
        {
          <TagTable  
            images={workspaceForm.rootImages}
            files={fileStore.files.toList().toArray()}
          />
        }
      </div>
      <div>
      </div>
      <div 
        style={{
          gridRow: "3",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <FileUpload
          accept={"application/json, image/*"}
          onChange={store.imageForm.uploadFiles}
        />
        <div 
          className="button" 
          style={{
            height: "100%"
          }}
          onClick={() => store.tagForm.init()}
        > 
          Add Tag 
        </div>
      </div>
    </div>
  );
});

export default Content;
