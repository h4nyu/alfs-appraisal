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
import ReferenceTag from "@sivic/web/components/ReferenceTag"
import Cursor from "@sivic/web/components/Cursor"

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
            <span>
              {featureForm.box?.id}
            </span>
            {featureForm.isReference && <ReferenceTag />}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Tag</label>
        </div>
        <div className="field-body">
          <div className="field">
            { featureForm.tag?.name ?? "None"}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Count</label>
        </div>
        <div className="field-body">
          <div className="field">
            { featureForm.points?.length ?? 0 } 
          </div>
        </div>
      </div>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around"
        }}
      >
        {
          featureForm.isReference ? <>
            <div className="card"
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
                lines={store.featureForm.referenceLines}
                selectedId={pointEditor.draggingId}
                onPointSelect={pointEditor.toggleDrag}
                onAdd={pointEditor.add}
                onMove={pointEditor.move}
                size={pointEditor.size}
                width={512}
              />
            </div>
          </> : <>
            <div className="card">
              <SvgCharPlot 
                data={featureForm.referenceFile?.data}
                lines={store.featureForm.referenceLines}
                points={featureForm.referencePoints}
                selectedId={store.featureForm.selectedReferencePoint?.id}
                size={pointEditor.size}
                width={512}
              />
            </div>
            <div className="card">
              <SvgCharPlot 
                data={featureForm.file?.data}
                points={pointEditor.points}
                lines={store.featureForm.lines}
                selectedId={pointEditor.draggingId}
                onPointSelect={pointEditor.toggleDrag}
                onMove={pointEditor.move}
                size={pointEditor.size}
                width={512}
              />
              <Cursor 
                onUp={pointEditor.up}
                onDown={pointEditor.down}
                onRight={pointEditor.right}
                onLeft={pointEditor.left}
              />
            </div>
          </>
        }
      </div>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="buttons">
          <DeleteBtn 
            onClick={() => store.featureForm.delete()}
          />
        </div>
        <div className="buttons">
          {
            !featureForm.isReference && <ResetBtn onClick={() => store.featureForm.resetPoints()} />
          }
          <SaveBtn 
            onClick={store.featureForm.save}
          />
        </div>
      </div>
    </div>
  );
});

export default Content;
