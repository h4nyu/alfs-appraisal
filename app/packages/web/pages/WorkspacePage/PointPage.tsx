import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import { InputMode } from "@sivic/web/store/BoxEditor"
import CharPlot from "@sivic/web/components/CharPlot";
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"
import TagSelector from "@sivic/web/components/TagSelector"
import DeleteBtn from "@sivic/web/components/DeleteBtn"

const Content = observer(() => {
  const { featureForm, pointEditor, workspaceForm } = store;
  return (
    <div
      className="box"
    >
      <div className="level">
        <div className="level-item">
          <div>
            <p className="heading">Tag</p>
            <TagSelector 
              value={featureForm.tagId}
              tags={workspaceForm.tags}
              onChange={t => featureForm.setTagId(t?.id)}
            />
          </div>
        </div>
        <div className="level-item">
          <div>
            <p className="heading">Count</p>
            <p className="title"> { pointEditor.points?.length ?? 0 } </p>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            pointEditor.del()
          }
        }}
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <SvgCharPlot 
          data={featureForm.file?.data}
          points={pointEditor.points}
          lines={store.featureForm.refLines}
          selectedId={pointEditor.draggingId}
          onPointSelect={pointEditor.toggleDrag}
          onAdd={pointEditor.add}
          onMove={pointEditor.move}
          size={pointEditor.size}
          width={512}
        />
      </div>
      <div className="level">
        <div className="level-left">
          <SaveBtn 
            onClick={store.featureForm.save}
          />
        </div>
        <div className="level-right">
          <DeleteBtn 
            onClick={() => store.featureForm.delete()}
          />
        </div>
      </div>
    </div>
  );
});

export default Content;
