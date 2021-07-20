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

const Content = observer(() => {
  const { imageProcess, editor, pointEditor } = store;
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
      }}
    >
      <div className="buttons">
        <TagSelector 
          tags={store.workspaceForm.tags}
          value={store.editor.tagId}
          onChange={store.editor.setTagId}
        />
        <a className="button is-info is-light" onClick={imageProcess.detectBoxes}>
          Auto Fill
        </a>
        <a className="button is-danger is-light" onClick={editor.clear}>
          Reset
        </a>
        <a className="button is-info is-light" onClick={imageProcess.save}>
          Save
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
