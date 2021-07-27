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
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
      }}
    >
      <div style={{display:"flex"}}>
        <TagSelector 
          tags={store.workspaceForm.tags}
          value={store.editor.tagId}
          onChange={store.editor.setTagId}
        />
          <ResetBtn onClick={editor.clear} />
          <SaveBtn onClick={imageProcess.save} />
          <a className="button is-danger is-light" style={{marginLeft:"auto"}} onClick={imageProcess.delete}>
            Delete
          </a>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            editor.del()
          }
        }}
        style={{
          overflow:"scroll",
          display: "grid",
          alignItems: "center",
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
    </div>
  );
});

export default Content;
