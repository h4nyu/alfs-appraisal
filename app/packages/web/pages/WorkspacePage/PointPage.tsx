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
import PointTable from "@sivic/web/components/PointTable"
import CheckBox from "@sivic/web/components/CheckBox"

const Content = observer(() => {
  const { featureForm, pointEditor, workspaceForm } = store;
  return (
    <div
      className="box"
    >
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">ID</label>
        </div>
        <div className="field-body">
          <div className="field">
            {featureForm.box?.id}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Tag</label>
        </div>
        <div className="field-body">
          <div className="field">
            <TagSelector 
              value={featureForm.tagId}
              tags={workspaceForm.tags}
              onChange={t => featureForm.setTagId(t?.id)}
            />
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Count</label>
        </div>
        <div className="field-body">
          <div className="field">
            { pointEditor.points?.length ?? 0 } 
          </div>
        </div>
      </div>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          tabIndex={0}
          onKeyDown={e => {
            if (e.keyCode === 8) {
              pointEditor.del()
            }
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
            width={256}
          />
        </div>
        <PointTable 
          points={pointEditor.points}
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
