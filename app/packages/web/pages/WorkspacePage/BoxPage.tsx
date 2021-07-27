import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import { InputMode } from "@sivic/web/store/BoxEditor"
import CharPlot from "@sivic/web/components/CharPlot";
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import CropedBox from "@sivic/web/components/CropedBox"
import TagSelector from "@sivic/web/components/TagSelector"
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"

const Content = observer(() => {
  const { imageProcess, editor, pointEditor } = store;
  return (
    <div
      className="box"
    >

      <div className="level">
        <div className="level-item">
          <div>
            <p className="heading">Tag</p>
            <TagSelector 
              value={store.editor.tagId}
              tags={store.workspaceForm.tags}
              onChange={x => store.editor.setTagId(x?.id)}
            />
          </div>
        </div>
        <div className="level-item">
          <div>
            <p className="heading">Count</p>
            <p className="title"> { editor.boxes.length } </p>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            editor.del()
          }
        }}
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        {
          imageProcess.file &&  
            <SvgCharPlot 
              data={imageProcess.file.data} 
              boxes={editor.boxes}
              mode={editor.mode}
              tags={store.workspaceForm.tags}
              selectedId={editor.draggingId}
              onSelect={editor.toggleDrag}
              onAdd={editor.add}
              onMove={editor.move}
              size={editor.size}
              width={1024}
          />
        }
      </div>
      <div style={{display:"flex"}}>
        <SaveBtn onClick={imageProcess.save} />
        <a className="button is-danger is-light" style={{marginLeft:"auto"}} onClick={imageProcess.delete}>
          Delete
        </a>
      </div>
    </div>
  );
});

export default Content;
